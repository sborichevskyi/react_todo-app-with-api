/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import {
  cancelEditing,
  deleteTodo,
  editTodoTitle,
  FilterEnum,
  handleTodo,
  updateTodoTitle,
} from '../../api/todos';

interface TodoItemProps {
  visibleTodos: Todo[];
  allTodos: Todo[];
  setAllTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  loadingTodoId: number;
  setLoadingTodoId: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  selectedFilter: FilterEnum;
  editTodoId: number | null;
  setEditTodoId: React.Dispatch<React.SetStateAction<number | null>>;
  setUpdInputText: React.Dispatch<React.SetStateAction<string>>;
  updInputText: string;
  oldText: string;
  setOldText: React.Dispatch<React.SetStateAction<string>>;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  visibleTodos,
  allTodos,
  setAllTodos,
  loadingTodoId,
  setLoadingTodoId,
  loading,
  setLoading,
  setError,
  setErrorMessage,
  selectedFilter,
  editTodoId,
  setEditTodoId,
  setUpdInputText,
  updInputText,
  oldText,
  setOldText,
}) => {
  return (
    <>
      {visibleTodos.map(todo => (
        <div
          data-cy="Todo"
          className={classNames('todo', {
            completed: todo.completed,
          })}
          key={todo.id}
        >
          {editTodoId !== todo.id ? (
            <>
              <label className="todo__status-label">
                <input
                  data-cy="TodoStatus"
                  type="checkbox"
                  className="todo__status"
                  checked={todo.completed}
                  onClick={() =>
                    handleTodo(
                      todo.id,
                      todo.completed,
                      setLoadingTodoId,
                      setLoading,
                      allTodos,
                      setError,
                      setErrorMessage,
                      setAllTodos,
                    )
                  }
                />
              </label>

              <span
                data-cy="TodoTitle"
                className="todo__title"
                onDoubleClick={() =>
                  editTodoTitle(
                    setEditTodoId,
                    todo,
                    setUpdInputText,
                    setOldText,
                  )
                }
              >
                {todo.title}
              </span>

              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
                onClick={() => {
                  deleteTodo(
                    todo.id,
                    allTodos,
                    setAllTodos,
                    setLoading,
                    setError,
                    setErrorMessage,
                    setLoadingTodoId,
                    selectedFilter,
                  );
                }}
              >
                ×
              </button>

              <div
                data-cy="TodoLoader"
                className={classNames('modal overlay', {
                  'is-active': loadingTodoId === todo.id && loading,
                })}
              >
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            </>
          ) : (
            <>
              <label className="todo__status-label">
                <input
                  data-cy="TodoStatus"
                  type="checkbox"
                  className="todo__status"
                />
              </label>

              <form
                onSubmit={ev =>
                  updateTodoTitle(
                    updInputText,
                    todo.id,
                    setLoading,
                    allTodos,
                    setAllTodos,
                    setError,
                    setErrorMessage,
                    ev,
                    setEditTodoId,
                    oldText,
                    setLoadingTodoId,
                    selectedFilter,
                  )
                }
              >
                <input
                  data-cy="TodoTitleField"
                  type="text"
                  className="todo__title-field"
                  placeholder="Empty todo will be deleted"
                  value={updInputText}
                  autoFocus
                  onChange={ev => setUpdInputText(ev.target.value)}
                  onBlur={ev =>
                    updateTodoTitle(
                      updInputText,
                      todo.id,
                      setLoading,
                      allTodos,
                      setAllTodos,
                      setError,
                      setErrorMessage,
                      ev,
                      setEditTodoId,
                      oldText,
                      setLoadingTodoId,
                      selectedFilter,
                    )
                  }
                  onKeyUp={ev =>
                    cancelEditing(ev, oldText, setEditTodoId, setUpdInputText)
                  }
                />
              </form>

              <div
                data-cy="TodoLoader"
                className={classNames('modal overlay', {
                  'is-active': loadingTodoId === todo.id && loading,
                })}
              >
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            </>
          )}
        </div>
      ))}
    </>
  );
};
