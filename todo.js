/**
 * ==========================================================================
 * JavaScript Logic & State Management: Vanilla To-Do Application
 * ==========================================================================
 *
 * Implements client-side state management, structured JSON storage via
 * window.localStorage, dynamic DOM generation using standard browser methods
 * (createElement, classList, textContent, dataset, append), and event delegation.
 */

// ==========================================
// 1. Application State Structure
// ==========================================
// Centralized state container keeps data synchronized across interactions.
const state = {
  tasks: [],
  filter: 'all', // 'all' | 'active' | 'completed'
  editingId: null, // ID of task currently being edited in-place, or null
};

// Storage key used to persist JSON data in window.localStorage
const STORAGE_KEY = 'portfolio_vanilla_todo_tasks_v1';

// DOM Element References
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoErrorMessage = document.getElementById('todo-error-message');
const todoTaskList = document.getElementById('todo-task-list');
const filterButtonsContainer = document.getElementById('todo-filter-container');
const itemsCountDisplay = document.getElementById('todo-items-count');
const clearCompletedBtn = document.getElementById('todo-clear-completed');
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const liveAnnouncer = document.getElementById('live-announcer');

// ==========================================
// 2. localStorage Persistence Functions
// ==========================================

/**
 * Loads saved tasks from window.localStorage.
 * Parses structured JSON and initializes default starter tasks if empty.
 */
function loadTasks() {
  try {
    const storedData = window.localStorage.getItem(STORAGE_KEY);
    if (storedData) {
      const parsed = JSON.parse(storedData);
      if (Array.isArray(parsed)) {
        state.tasks = parsed;
        return;
      }
    }
  } catch (error) {
    console.warn('Could not read from window.localStorage:', error);
  }

  // Initial starter tasks if storage is empty
  state.tasks = [
    {
      id: 'task_' + Date.now() + '_1',
      text: 'Review Machine Learning lecture notes for Stanford Coursera certification',
      completed: true,
      createdAt: Date.now() - 3600000,
    },
    {
      id: 'task_' + Date.now() + '_2',
      text: 'Implement responsive CSS Grid layout for SchemeSathiAI project dashboard',
      completed: false,
      createdAt: Date.now() - 1800000,
    },
    {
      id: 'task_' + Date.now() + '_3',
      text: 'Verify WCAG 2.2 accessibility focus states and contrast ratios',
      completed: false,
      createdAt: Date.now() - 900000,
    },
  ];
  saveTasks();
}

/**
 * Saves state.tasks into window.localStorage as a structured JSON string.
 */
function saveTasks() {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.tasks));
  } catch (error) {
    console.error('Could not save to window.localStorage:', error);
  }
}

// ==========================================
// 3. Accessibility & Announcement Helper
// ==========================================

/**
 * Announces status changes to screen readers via an aria-live polite region.
 */
function announceStatus(message) {
  if (liveAnnouncer) {
    liveAnnouncer.textContent = '';
    setTimeout(() => {
      liveAnnouncer.textContent = message;
    }, 50);
  }
}

// ==========================================
// 4. Core CRUD & Logical Operations
// ==========================================

/**
 * CREATE: Adds a new task to the state.
 * Validates against empty input, saves to localStorage, and re-renders DOM.
 */
function addTask(rawText) {
  const trimmed = rawText.trim();

  // Prevent empty tasks
  if (!trimmed) {
    showInputError('Task description cannot be empty. Please type a task.');
    return false;
  }

  // Create new task entity
  const newTask = {
    id: 'task_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    text: trimmed,
    completed: false,
    createdAt: Date.now(),
  };

  // Add task at the beginning of the list
  state.tasks.unshift(newTask);

  // Sync state to storage and update DOM
  saveTasks();
  renderTasks();
  clearInputError();
  announceStatus(`Added new task: "${trimmed}"`);
  return true;
}

/**
 * UPDATE (State Toggle): Toggles the completed state of a task.
 */
function toggleTask(id) {
  const task = state.tasks.find((t) => t.id === id);
  if (task) {
    task.completed = !task.completed;
    saveTasks();
    renderTasks();
    announceStatus(`Task "${task.text}" marked as ${task.completed ? 'completed' : 'active'}.`);
  }
}

/**
 * UPDATE (Content Edit): Updates the text of an existing task.
 */
function updateTask(id, newText) {
  const trimmed = newText.trim();
  if (!trimmed) {
    // If empty text provided during edit, delete the task
    deleteTask(id);
    return;
  }

  const task = state.tasks.find((t) => t.id === id);
  if (task) {
    task.text = trimmed;
    state.editingId = null; // Exit edit mode
    saveTasks();
    renderTasks();
    announceStatus(`Task updated to: "${trimmed}"`);
  }
}

/**
 * DELETE: Removes a task by its unique ID.
 */
function deleteTask(id) {
  const task = state.tasks.find((t) => t.id === id);
  const taskText = task ? task.text : 'task';

  state.tasks = state.tasks.filter((t) => t.id !== id);
  if (state.editingId === id) {
    state.editingId = null;
  }

  saveTasks();
  renderTasks();
  announceStatus(`Deleted task: "${taskText}"`);
}

/**
 * FILTER: Updates the active filter state ('all', 'active', 'completed').
 */
function filterTasks(filterName) {
  state.filter = filterName;
  renderTasks();
  announceStatus(`Viewing ${filterName} tasks.`);
}

/**
 * Clears all completed tasks from state.
 */
function clearCompleted() {
  const originalCount = state.tasks.length;
  state.tasks = state.tasks.filter((t) => !t.completed);
  const deletedCount = originalCount - state.tasks.length;

  if (deletedCount > 0) {
    saveTasks();
    renderTasks();
    announceStatus(`Cleared ${deletedCount} completed task${deletedCount > 1 ? 's' : ''}.`);
  }
}

// ==========================================
// 5. Dynamic DOM Manipulation (renderTasks)
// ==========================================

/**
 * READ / RENDER: Rebuilds the visible task list dynamically.
 * Uses createElement, append, classList, textContent, and dataset.
 */
function renderTasks() {
  // Clear existing task items
  todoTaskList.innerHTML = '';

  // Calculate metrics
  const activeCount = state.tasks.filter((t) => !t.completed).length;
  const completedCount = state.tasks.length - activeCount;

  // Update metrics count display
  if (itemsCountDisplay) {
    itemsCountDisplay.textContent = `${activeCount} active item${activeCount === 1 ? '' : 's'}`;
  }

  // Toggle visibility of clear completed button
  if (clearCompletedBtn) {
    clearCompletedBtn.style.display = completedCount > 0 ? 'inline-block' : 'none';
  }

  // Update active state of filter buttons
  const filterButtons = filterButtonsContainer.querySelectorAll('button[data-filter]');
  filterButtons.forEach((btn) => {
    const isSelected = btn.dataset.filter === state.filter;
    btn.classList.toggle('active', isSelected);
    btn.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
  });

  // Filter tasks based on current filter selection
  const visibleTasks = state.tasks.filter((t) => {
    if (state.filter === 'active') return !t.completed;
    if (state.filter === 'completed') return t.completed;
    return true;
  });

  // Render empty state if no tasks match
  if (visibleTasks.length === 0) {
    const emptyLi = document.createElement('li');
    emptyLi.className = 'empty-state';

    let message = 'No tasks yet. Add a new task above to get started!';
    if (state.filter === 'active' && state.tasks.length > 0) {
      message = 'All tasks are completed! Excellent progress.';
    } else if (state.filter === 'completed') {
      message = 'No completed tasks yet. Finish a task to see it here.';
    }

    emptyLi.textContent = message;
    todoTaskList.append(emptyLi);
    return;
  }

  // Build task elements dynamically using standard DOM methods
  visibleTasks.forEach((task) => {
    const li = document.createElement('li');
    li.className = 'task-item';
    li.dataset.id = task.id;

    if (task.completed) {
      li.classList.add('completed');
    }

    const isEditing = state.editingId === task.id;

    if (isEditing) {
      // -------------------------------
      // INLINE EDIT MODE (DOM Elements)
      // -------------------------------
      const editForm = document.createElement('form');
      editForm.className = 'edit-form';
      editForm.dataset.action = 'save-edit-form';

      const editInput = document.createElement('input');
      editInput.type = 'text';
      editInput.value = task.text;
      editInput.className = 'edit-input';
      editInput.dataset.role = 'edit-input';
      editInput.setAttribute('aria-label', `Edit task: ${task.text}`);

      const actionsDiv = document.createElement('div');
      actionsDiv.className = 'edit-actions';

      const saveBtn = document.createElement('button');
      saveBtn.type = 'button';
      saveBtn.className = 'btn-save';
      saveBtn.dataset.action = 'save-edit';
      saveBtn.textContent = 'Save';

      const cancelBtn = document.createElement('button');
      cancelBtn.type = 'button';
      cancelBtn.className = 'btn-cancel';
      cancelBtn.dataset.action = 'cancel-edit';
      cancelBtn.textContent = 'Cancel';

      actionsDiv.append(saveBtn, cancelBtn);
      editForm.append(editInput, actionsDiv);
      li.append(editForm);

      // Auto-focus the input
      setTimeout(() => editInput.focus(), 20);
    } else {
      // -------------------------------
      // NORMAL READ MODE (DOM Elements)
      // -------------------------------
      const contentWrapper = document.createElement('div');
      contentWrapper.className = 'task-content-wrapper';

      // Checkbox Toggle
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'task-checkbox';
      checkbox.checked = task.completed;
      checkbox.dataset.action = 'toggle';
      checkbox.setAttribute('aria-label', `Mark "${task.text}" as ${task.completed ? 'active' : 'completed'}`);

      // Task Text
      const textSpan = document.createElement('span');
      textSpan.className = 'task-text';
      textSpan.textContent = task.text;

      contentWrapper.append(checkbox, textSpan);

      // Actions Container (Edit & Delete Buttons)
      const actionsWrapper = document.createElement('div');
      actionsWrapper.className = 'task-actions';

      // Edit Button
      const editBtn = document.createElement('button');
      editBtn.type = 'button';
      editBtn.className = 'btn-action';
      editBtn.dataset.action = 'edit';
      editBtn.setAttribute('aria-label', `Edit task: ${task.text}`);
      editBtn.textContent = 'Edit';

      // Delete Button
      const deleteBtn = document.createElement('button');
      deleteBtn.type = 'button';
      deleteBtn.className = 'btn-action btn-delete';
      deleteBtn.dataset.action = 'delete';
      deleteBtn.setAttribute('aria-label', `Delete task: ${task.text}`);
      deleteBtn.textContent = 'Delete';

      actionsWrapper.append(editBtn, deleteBtn);
      li.append(contentWrapper, actionsWrapper);
    }

    // Append to list container
    todoTaskList.append(li);
  });
}

// ==========================================
// 6. Input Validation Helpers
// ==========================================

function showInputError(message) {
  if (todoErrorMessage) {
    todoErrorMessage.textContent = message;
    todoErrorMessage.classList.add('show');
  }
  if (todoInput) {
    todoInput.setAttribute('aria-invalid', 'true');
    todoInput.focus();
  }
}

function clearInputError() {
  if (todoErrorMessage) {
    todoErrorMessage.textContent = '';
    todoErrorMessage.classList.remove('show');
  }
  if (todoInput) {
    todoInput.removeAttribute('aria-invalid');
  }
}

// ==========================================
// 7. Event Handling & Event Delegation
// ==========================================

// (A) Form Submission (Add Task)
todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (addTask(todoInput.value)) {
    todoInput.value = '';
  }
});

// Clear error on typing
todoInput.addEventListener('input', () => {
  clearInputError();
});

// (B) EVENT DELEGATION on the <ul> Task List Container
// Intercepts clicks on dynamically generated Edit, Delete, Save, and Cancel buttons
todoTaskList.addEventListener('click', (e) => {
  const target = e.target;
  const actionButton = target.closest('[data-action]');
  if (!actionButton) return;

  const action = actionButton.dataset.action;
  const li = actionButton.closest('li[data-id]');
  if (!li) return;

  const taskId = li.dataset.id;
  if (!taskId) return;

  if (action === 'delete') {
    deleteTask(taskId);
  } else if (action === 'edit') {
    state.editingId = taskId;
    renderTasks();
  } else if (action === 'cancel-edit') {
    state.editingId = null;
    renderTasks();
  } else if (action === 'save-edit') {
    const editInput = li.querySelector('input[data-role="edit-input"]');
    if (editInput) {
      updateTask(taskId, editInput.value);
    }
  }
});

// (C) EVENT DELEGATION on Checkbox Toggles
todoTaskList.addEventListener('change', (e) => {
  const target = e.target;
  if (target.matches('input[type="checkbox"][data-action="toggle"]')) {
    const li = target.closest('li[data-id]');
    if (li && li.dataset.id) {
      toggleTask(li.dataset.id);
    }
  }
});

// (D) Keyboard Accessibility for Inline Edit (Enter to save, Escape to cancel)
todoTaskList.addEventListener('keydown', (e) => {
  const target = e.target;
  if (target.dataset.role === 'edit-input') {
    const li = target.closest('li[data-id]');
    if (!li || !li.dataset.id) return;

    if (e.key === 'Enter') {
      e.preventDefault();
      updateTask(li.dataset.id, target.value);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      state.editingId = null;
      renderTasks();
    }
  }
});

// (E) EVENT DELEGATION on Filter Buttons
filterButtonsContainer.addEventListener('click', (e) => {
  const filterBtn = e.target.closest('button[data-filter]');
  if (filterBtn && filterBtn.dataset.filter) {
    filterTasks(filterBtn.dataset.filter);
  }
});

// (F) Clear Completed Button
if (clearCompletedBtn) {
  clearCompletedBtn.addEventListener('click', () => {
    clearCompleted();
  });
}

// (G) Theme Toggle Handler for standalone view
if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    const root = document.documentElement;
    const isDark = root.getAttribute('data-theme') === 'dark';
    if (isDark) {
      root.removeAttribute('data-theme');
      themeToggleBtn.textContent = '🌙 Dark Mode';
      localStorage.setItem('theme-mode', 'light');
    } else {
      root.setAttribute('data-theme', 'dark');
      themeToggleBtn.textContent = '☀️ Light Mode';
      localStorage.setItem('theme-mode', 'dark');
    }
  });

  // Initialize theme from storage
  const savedTheme = localStorage.getItem('theme-mode');
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggleBtn.textContent = '☀️ Light Mode';
  }
}

// ==========================================
// 8. Application Initialization
// ==========================================
// Load saved tasks from localStorage and perform initial DOM render
loadTasks();
renderTasks();
