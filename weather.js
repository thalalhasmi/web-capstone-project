/**
 * ==========================================================================
 * JavaScript Logic & RESTful APIs: Standalone Vanilla Weather Dashboard
 * ==========================================================================
 *
 * Implements:
 * 1. REST API integration with Open-Meteo public endpoints (no API key required)
 * 2. Asynchronous JavaScript using native Fetch API and async/await
 * 3. Robust error handling (response.ok, try...catch...finally, user alerts)
 * 4. Dynamic DOM generation for Current Weather, 6 Metrics, and 7-Day Forecast
 * 5. Structured state management with window.localStorage persistence
 * 6. Unit toggling (°C / °F) with immediate DOM re-render
 * 7. Browser Geolocation (navigator.geolocation) support
 * 8. Accessible ARIA live regions and keyboard controls
 */

(function () {
  'use strict';

  // 1. Storage Keys
  const STORAGE_KEYS = {
    HISTORY: 'portfolio_weather_history_v2',
    UNIT: 'portfolio_weather_unit_v2',
    LAST_CITY: 'portfolio_weather_last_city_v2',
  };

  // 2. Application State
  const state = {
    searchQuery: '',
    isLoading: false,
    error: null,
    report: null,
    unit: window.localStorage.getItem(STORAGE_KEYS.UNIT) || 'celsius',
    recentSearches: loadRecentSearches(),
  };

  // 3. WMO Weather Code Interpreter
  function interpretWmoCode(code, isDay) {
    if (typeof isDay === 'undefined') isDay = true;
    switch (code) {
      case 0:
        return {
          text: 'Clear Sky',
          icon: isDay
            ? `<svg class="w-full h-full text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`
            : `<svg class="w-full h-full text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`,
        };
      case 1:
        return {
          text: 'Mainly Clear',
          icon: isDay
            ? `<svg class="w-full h-full text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/></svg>`
            : `<svg class="w-full h-full text-indigo-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`,
        };
      case 2:
        return {
          text: 'Partly Cloudy',
          icon: `<svg class="w-full h-full text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="M20 12h2"/><path d="m19.07 4.93-1.41 1.41"/><path d="M15.5 17h4a3.5 3.5 0 0 0 0-7h-.5a5 5 0 0 0-9.8-1.5A3.5 3.5 0 0 0 6 17h9.5"/></svg>`,
        };
      case 3:
        return {
          text: 'Overcast',
          icon: `<svg class="w-full h-full text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>`,
        };
      case 45:
      case 48:
        return {
          text: 'Fog / Mist',
          icon: `<svg class="w-full h-full text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14h16"/><path d="M4 18h16"/><path d="M4 10h16"/><path d="M7 6h10"/></svg>`,
        };
      case 51:
      case 53:
      case 55:
        return {
          text: 'Drizzle',
          icon: `<svg class="w-full h-full text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/><path d="m8 19-2 3"/><path d="m12 19-2 3"/><path d="m16 19-2 3"/></svg>`,
        };
      case 61:
      case 63:
      case 65:
        return {
          text: code === 65 ? 'Heavy Rain' : code === 63 ? 'Moderate Rain' : 'Light Rain',
          icon: `<svg class="w-full h-full text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="m8 17-1 4"/><path d="m12 17-1 4"/><path d="m16 17-1 4"/></svg>`,
        };
      case 71:
      case 73:
      case 75:
      case 77:
        return {
          text: code === 75 ? 'Heavy Snow' : 'Snowfall',
          icon: `<svg class="w-full h-full text-blue-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M8 15h.01"/><path d="M8 19h.01"/><path d="M12 17h.01"/><path d="M12 21h.01"/><path d="M16 15h.01"/><path d="M16 19h.01"/></svg>`,
        };
      case 80:
      case 81:
      case 82:
        return {
          text: 'Rain Showers',
          icon: `<svg class="w-full h-full text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="m7 18-2 4"/><path d="m11 18-2 4"/><path d="m15 18-2 4"/><path d="m19 18-2 4"/></svg>`,
        };
      case 95:
      case 96:
      case 99:
        return {
          text: 'Thunderstorm',
          icon: `<svg class="w-full h-full text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/><path d="m13 14-3 5h4l-2 5"/></svg>`,
        };
      default:
        return {
          text: 'Variable Weather',
          icon: `<svg class="w-full h-full text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>`,
        };
    }
  }

  function degreesToCardinal(deg) {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round((deg % 360) / 22.5) % 16;
    return directions[index];
  }

  function toFahrenheit(c) {
    return (c * 9) / 5 + 32;
  }

  function formatTemp(tempC, unit) {
    const val = unit === 'fahrenheit' ? toFahrenheit(tempC) : tempC;
    return `${Math.round(val)}°${unit === 'fahrenheit' ? 'F' : 'C'}`;
  }

  function loadRecentSearches() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEYS.HISTORY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed.slice(0, 6);
      }
    } catch (e) {
      // ignore
    }
    return ['Chennai', 'Madurai', 'London', 'Tokyo', 'New York'];
  }

  function saveRecentSearches(city) {
    try {
      const normalized = city.trim();
      if (!normalized) return;
      const filtered = state.recentSearches.filter(
        (c) => c.toLowerCase() !== normalized.toLowerCase()
      );
      state.recentSearches = [normalized, ...filtered].slice(0, 6);
      window.localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(state.recentSearches));
      renderRecentChips();
    } catch (e) {
      // ignore
    }
  }

  // 4. RESTful Fetch Functions (async/await)
  async function fetchCoordinates(query) {
    const endpoint = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      query
    )}&count=5&language=en&format=json`;

    const response = await fetch(endpoint, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`Geocoding server error: HTTP ${response.status}`);
    }

    const data = await response.json();
    if (!data || !data.results || data.results.length === 0) {
      throw new Error(`No locations found matching "${query}". Please check spelling.`);
    }

    return data.results[0];
  }

  async function fetchWeatherData(geo) {
    const { latitude, longitude, name, admin1, country, country_code, elevation, timezone } = geo;

    const endpoint = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_sum,precipitation_probability_max,wind_speed_10m_max&timezone=auto`;

    const response = await fetch(endpoint, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`Weather service returned HTTP ${response.status}`);
    }

    const raw = await response.json();
    if (!raw.current || !raw.daily) {
      throw new Error('Malformed meteorological response from server.');
    }

    const isDay = raw.current.is_day === 1;
    const currentCode = raw.current.weather_code;
    const condition = interpretWmoCode(currentCode, isDay);

    const currentObs = {
      time: raw.current.time,
      temperature: raw.current.temperature_2m,
      apparentTemperature: raw.current.apparent_temperature,
      relativeHumidity: raw.current.relative_humidity_2m,
      isDay: isDay,
      precipitation: raw.current.precipitation,
      weatherCode: currentCode,
      cloudCover: raw.current.cloud_cover,
      pressure: raw.current.pressure_msl || raw.current.surface_pressure,
      windSpeed: raw.current.wind_speed_10m,
      windDirection: raw.current.wind_direction_10m,
      windGusts: raw.current.wind_gusts_10m,
      conditionText: condition.text,
      conditionIconSvg: condition.icon,
    };

    const dailyItems = [];
    const dates = raw.daily.time || [];

    for (let i = 0; i < dates.length; i++) {
      const dateStr = dates[i];
      const d = new Date(dateStr + 'T00:00:00');
      const dayName = i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-US', { weekday: 'short' });
      const code = raw.daily.weather_code[i];
      const dailyCond = interpretWmoCode(code, true);

      dailyItems.push({
        dateStr: dateStr,
        dayName: dayName,
        weatherCode: code,
        conditionText: dailyCond.text,
        conditionIconSvg: dailyCond.icon,
        tempMax: raw.daily.temperature_2m_max[i],
        tempMin: raw.daily.temperature_2m_min[i],
        precipitationProbability: raw.daily.precipitation_probability_max ? raw.daily.precipitation_probability_max[i] : 0,
        windSpeedMax: raw.daily.wind_speed_10m_max ? raw.daily.wind_speed_10m_max[i] : 0,
        sunrise: raw.daily.sunrise && raw.daily.sunrise[i] ? raw.daily.sunrise[i].split('T')[1] : '--:--',
        sunset: raw.daily.sunset && raw.daily.sunset[i] ? raw.daily.sunset[i].split('T')[1] : '--:--',
      });
    }

    return {
      location: {
        name: name,
        region: admin1,
        country: country,
        countryCode: country_code,
        latitude: latitude,
        longitude: longitude,
        elevation: elevation,
        timezone: raw.timezone || timezone,
      },
      current: currentObs,
      daily: dailyItems,
      retrievedAt: Date.now(),
    };
  }

  async function executeSearch(cityQuery) {
    const trimmed = (cityQuery || '').trim();
    if (!trimmed) {
      showError('Please enter a city or location name to search.');
      return;
    }

    showLoading(`Contacting meteorological stations for "${trimmed}"...`);

    try {
      const geo = await fetchCoordinates(trimmed);
      const report = await fetchWeatherData(geo);

      state.report = report;
      state.error = null;

      saveRecentSearches(geo.name);
      try {
        window.localStorage.setItem(STORAGE_KEYS.LAST_CITY, geo.name);
      } catch (e) {}

      renderWeatherReport(report);
      announce(`Weather retrieved for ${report.location.name}: ${Math.round(report.current.temperature)}°C, ${report.current.conditionText}.`);
    } catch (err) {
      showError(err.message || 'An unexpected error occurred.');
    } finally {
      hideLoading();
    }
  }

  async function executeGeolocation() {
    if (!navigator.geolocation) {
      showError('Geolocation is not supported by your current browser.');
      return;
    }

    showLoading('Acquiring GPS coordinates...');

    navigator.geolocation.getCurrentPosition(
      async function (pos) {
        const coords = pos.coords;
        try {
          let cityName = 'Current Location';
          let countryName = '';

          try {
            const revRes = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${coords.latitude}&longitude=${coords.longitude}&localityLanguage=en`
            );
            if (revRes.ok) {
              const revData = await revRes.json();
              cityName = revData.city || revData.locality || 'Current Location';
              countryName = revData.countryName || '';
            }
          } catch (e) {}

          const geo = {
            id: Date.now(),
            name: cityName,
            country: countryName,
            latitude: coords.latitude,
            longitude: coords.longitude,
          };

          const report = await fetchWeatherData(geo);
          state.report = report;
          state.error = null;
          saveRecentSearches(cityName);
          renderWeatherReport(report);
          announce(`Current location weather loaded: ${cityName}.`);
        } catch (err) {
          showError(err.message || 'Failed to retrieve weather for coordinates.');
        } finally {
          hideLoading();
        }
      },
      function (err) {
        hideLoading();
        showError('Unable to retrieve location (permission denied or timed out).');
      },
      { timeout: 10000 }
    );
  }

  // 5. DOM Display Functions
  function showLoading(msg) {
    const statusBox = document.getElementById('status-container');
    const submitBtn = document.getElementById('search-submit-btn');
    if (submitBtn) submitBtn.disabled = true;

    if (statusBox) {
      statusBox.innerHTML = `
        <div class="status-loading" role="status">
          <svg style="animation: spin 1s linear infinite; width: 1.25rem; height: 1.25rem;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10" stroke-opacity="0.25"/><path d="M12 2a10 10 0 0 1 10 10"/></svg>
          <span>${msg}</span>
        </div>
      `;
    }
  }

  function hideLoading() {
    const statusBox = document.getElementById('status-container');
    const submitBtn = document.getElementById('search-submit-btn');
    if (submitBtn) submitBtn.disabled = false;
    if (statusBox) statusBox.innerHTML = '';
  }

  function showError(msg) {
    const statusBox = document.getElementById('status-container');
    if (statusBox) {
      statusBox.innerHTML = `
        <div class="status-error" role="alert">
          <div>
            <p class="title">Notice</p>
            <p class="desc">${msg}</p>
          </div>
          <button type="button" class="btn-primary" style="padding: 0.4rem 0.85rem; font-size: 0.75rem;" id="error-retry-btn">Retry</button>
        </div>
      `;
      const retryBtn = document.getElementById('error-retry-btn');
      if (retryBtn) {
        retryBtn.addEventListener('click', function () {
          const input = document.getElementById('search-input');
          executeSearch(input ? input.value : 'Chennai');
        });
      }
    }
  }

  function renderRecentChips() {
    const chipsList = document.getElementById('chips-list');
    if (!chipsList) return;

    if (state.recentSearches.length === 0) {
      chipsList.innerHTML = `<span style="font-size: 0.75rem; color: var(--subtle-text-color);">No recent searches.</span>`;
      return;
    }

    chipsList.innerHTML = state.recentSearches
      .map(
        (city) => `
        <button type="button" class="chip-btn" data-city="${city}">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          <span>${city}</span>
        </button>
      `
      )
      .join('');
  }

  function renderWeatherReport(report) {
    const display = document.getElementById('display-container');
    if (!display) return;

    const loc = report.location;
    const cur = report.current;
    const daily = report.daily;

    const formattedDate = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    const windDir = degreesToCardinal(cur.windDirection);
    const windSpeedUnit = state.unit === 'fahrenheit' ? 'mph' : 'km/h';
    const windSpeedVal = state.unit === 'fahrenheit' ? Math.round(cur.windSpeed * 0.621371) : Math.round(cur.windSpeed);

    display.innerHTML = `
      <!-- Hero Card -->
      <article class="hero-card" aria-label="Current Weather Details">
        <div class="hero-left">
          <span class="telemetry-pill">
            <span class="pulse-dot"></span> Live Meteorological Observation
          </span>
          <div>
            <h2 class="hero-city-title">${loc.name}</h2>
            ${loc.region || loc.country ? `<p class="hero-region">${[loc.region, loc.country].filter(Boolean).join(', ')}</p>` : ''}
            <p class="hero-coords">${formattedDate} &bull; ${loc.latitude.toFixed(2)}°N, ${loc.longitude.toFixed(2)}°E</p>
          </div>

          <div class="temp-row">
            <div class="hero-temp">${formatTemp(cur.temperature, state.unit)}</div>
            <div>
              <div class="hero-feels">Feels like ${formatTemp(cur.apparentTemperature, state.unit)}</div>
              <div class="hero-range">Range: ${formatTemp(daily[0].tempMin, state.unit)} &ndash; ${formatTemp(daily[0].tempMax, state.unit)}</div>
            </div>
          </div>
        </div>

        <div class="hero-right">
          <div class="hero-icon-wrapper">${cur.conditionIconSvg}</div>
          <div class="condition-badge">${cur.conditionText}</div>
        </div>
      </article>

      <!-- 6 Metrics Grid -->
      <section aria-labelledby="metrics-title">
        <h3 id="metrics-title" class="metrics-section-title">Atmospheric Telemetry</h3>
        <div class="metrics-grid">
          <!-- Humidity -->
          <div class="metric-card">
            <div class="metric-header">
              <span>Humidity</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
            </div>
            <div class="metric-value">${cur.relativeHumidity} <small>%</small></div>
            <div class="metric-footer">${cur.relativeHumidity > 70 ? 'High Moisture' : 'Comfortable'}</div>
          </div>

          <!-- Wind -->
          <div class="metric-card">
            <div class="metric-header">
              <span>Wind</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/></svg>
            </div>
            <div class="metric-value">${windSpeedVal} <small>${windSpeedUnit}</small></div>
            <div class="metric-footer">${windDir} (${cur.windDirection}°)</div>
          </div>

          <!-- Pressure -->
          <div class="metric-card">
            <div class="metric-header">
              <span>Pressure</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>
            </div>
            <div class="metric-value">${Math.round(cur.pressure)} <small>hPa</small></div>
            <div class="metric-footer">Mean Sea Level</div>
          </div>

          <!-- Precipitation -->
          <div class="metric-card">
            <div class="metric-header">
              <span>Rain Chance</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m8 17-1 4"/><path d="m12 17-1 4"/></svg>
            </div>
            <div class="metric-value">${daily[0].precipitationProbability} <small>%</small></div>
            <div class="metric-footer">${cur.precipitation} mm accumulation</div>
          </div>

          <!-- Cloud Cover -->
          <div class="metric-card">
            <div class="metric-header">
              <span>Clouds</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>
            </div>
            <div class="metric-value">${cur.cloudCover} <small>%</small></div>
            <div class="metric-footer">${cur.cloudCover > 60 ? 'Overcast' : 'Clear Sky'}</div>
          </div>

          <!-- Sunrise/Sunset -->
          <div class="metric-card">
            <div class="metric-header">
              <span>Solar Horizon</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/></svg>
            </div>
            <div style="font-size: 0.8rem; font-weight: 700; color: var(--heading-color);">
              <div>Rise: ${daily[0].sunrise}</div>
              <div>Set: ${daily[0].sunset}</div>
            </div>
            <div class="metric-footer">Local Solar Cycle</div>
          </div>
        </div>
      </section>

      <!-- 7-Day Forecast Grid -->
      <section aria-labelledby="forecast-title">
        <h3 id="forecast-title" class="metrics-section-title">7-Day Synoptic Forecast</h3>
        <div class="forecast-grid">
          ${daily
            .map(
              (day) => `
            <div class="forecast-card">
              <div>
                <div class="forecast-day">${day.dayName}</div>
                <div class="forecast-date">${day.dateStr.slice(5)}</div>
              </div>
              <div class="forecast-icon">${day.conditionIconSvg}</div>
              <div class="forecast-cond">${day.conditionText}</div>
              <div class="forecast-temps">
                <span class="temp-max">${formatTemp(day.tempMax, state.unit)}</span>
                <span class="temp-min">${formatTemp(day.tempMin, state.unit)}</span>
              </div>
            </div>
          `
            )
            .join('')}
        </div>
      </section>
    `;
  }

  function announce(msg) {
    const el = document.getElementById('live-announcer');
    if (el) el.textContent = msg;
  }

  // 6. Theme and Initialization
  function initTheme() {
    const themeBtn = document.getElementById('theme-toggle-btn');
    const stored = localStorage.getItem('theme-mode');
    const isDark = stored ? stored === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      if (themeBtn) themeBtn.textContent = '☀️ Light Mode';
    } else {
      document.documentElement.removeAttribute('data-theme');
      if (themeBtn) themeBtn.textContent = '🌙 Dark Mode';
    }

    themeBtn?.addEventListener('click', function () {
      const current = document.documentElement.getAttribute('data-theme');
      if (current === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme-mode', 'light');
        themeBtn.textContent = '🌙 Dark Mode';
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme-mode', 'dark');
        themeBtn.textContent = '☀️ Light Mode';
      }
    });
  }

  function init() {
    initTheme();

    const form = document.getElementById('search-form');
    const input = document.getElementById('search-input');
    const geoBtn = document.getElementById('geo-btn');
    const unitC = document.getElementById('unit-c');
    const unitF = document.getElementById('unit-f');
    const clearHistBtn = document.getElementById('clear-history-btn');
    const chipsContainer = document.getElementById('chips-list');

    // Unit toggle buttons
    function updateUnitUI() {
      if (unitC && unitF) {
        if (state.unit === 'celsius') {
          unitC.classList.add('active');
          unitF.classList.remove('active');
        } else {
          unitF.classList.add('active');
          unitC.classList.remove('active');
        }
      }
    }

    updateUnitUI();

    unitC?.addEventListener('click', function () {
      state.unit = 'celsius';
      localStorage.setItem(STORAGE_KEYS.UNIT, 'celsius');
      updateUnitUI();
      if (state.report) renderWeatherReport(state.report);
    });

    unitF?.addEventListener('click', function () {
      state.unit = 'fahrenheit';
      localStorage.setItem(STORAGE_KEYS.UNIT, 'fahrenheit');
      updateUnitUI();
      if (state.report) renderWeatherReport(state.report);
    });

    form?.addEventListener('submit', function (e) {
      e.preventDefault();
      if (input) executeSearch(input.value);
    });

    geoBtn?.addEventListener('click', executeGeolocation);

    clearHistBtn?.addEventListener('click', function () {
      state.recentSearches = [];
      localStorage.removeItem(STORAGE_KEYS.HISTORY);
      renderRecentChips();
    });

    chipsContainer?.addEventListener('click', function (e) {
      const btn = e.target.closest('[data-city]');
      if (btn) {
        const city = btn.getAttribute('data-city');
        if (input) input.value = city;
        executeSearch(city);
      }
    });

    renderRecentChips();

    // Default search
    const lastCity = localStorage.getItem(STORAGE_KEYS.LAST_CITY) || 'Chennai';
    executeSearch(lastCity);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
