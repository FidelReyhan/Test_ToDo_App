import { useEffect, useRef, useState } from "react";
import { FaPaperPlane, FaPencil, FaTrash } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router";
import { getCookie, removeCookie } from "../../utils/cookie";
import { Button } from "../atom/Button";
import { Card } from "../atom/Card";
import { Page } from "../atom/Page";

type Todo = {
  id: string;
  text: string;
  done: boolean;
};

const TodoScreen = () => {
  const [username, setUsername] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentlyEditedTodo, setCurrentlyEditedTodo] = useState<Todo | null>(
    null
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const logout = () => {
    removeCookie("username");
    navigate("/login");
  };

  const addTodo = (text: string) => {
    if (text.trim() === "") return;
    setTodos([...todos, { id: Date.now().toString(), text, done: false }]);
  };

  const removeTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const startEditTodo = (id: string) => {
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      setCurrentlyEditedTodo(todo);
      if (inputRef.current) {
        inputRef.current.value = todo.text;
        inputRef.current.focus();
      }
    }
  };

  const submitEditTodo = (id: string, text: string) => {
    if (text.trim() === "") return;
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text, done: false } : todo
      )
    );
    setCurrentlyEditedTodo(null);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }

    const storedUsername = getCookie("username");
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <Page>
      <h1 className='uppercase font-bold text-3xl mb-8'>
        noted, <span className='text-primary/50'>{username}</span>
      </h1>
      <FiLogOut
        className='fixed top-4 left-4 cursor-pointer'
        onClick={logout}
        size={20}
      />
      <div className='flex flex-col gap-4 w-full max-w-xl'>
        {todos?.map((todo, index) => (
          <Card
            key={`todo-${index}`}
            className='w-full flex justify-between items-cente glass bg-white/50'
          >
            <div className='flex items-center gap-2'>
              {todo.text}{" "}
              <FaPencil
                data-testid={`edit-todo-${todo.id}`}
                onClick={() => startEditTodo(todo.id)}
                size={10}
              />
            </div>
            <FaTrash
              data-testid={`delete-todo-${todo.id}`}
              onClick={() => removeTodo(todo.id)}
              size={10}
            />
          </Card>
        ))}
      </div>
      <div className='fixed bottom-4 left-4 right-4 flex gap-4 debug lg:max-w-xl xl:left-1/2 xl:-translate-x-1/2 xl:right-0'>
        <input
          ref={inputRef}
          className='outline-none border-none w-full debug min-h-[40px] rounded-lg bg-white/50 px-3'
          spellCheck='false'
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              const value = e.currentTarget.value;
              if (value) {
                if (currentlyEditedTodo) {
                  submitEditTodo(currentlyEditedTodo.id, value);
                } else {
                  addTodo(value);
                }
                e.currentTarget.value = "";
              }
            }
          }}
        />
        <Button
          onClick={() => {
            if (inputRef.current) {
              const value = inputRef.current.value;
              if (value) {
                if (currentlyEditedTodo) {
                  submitEditTodo(currentlyEditedTodo.id, value);
                } else {
                  addTodo(value);
                }
                inputRef.current.value = "";
              }
            }
          }}
          className='px-3 py-2'
          data-testid='submit-todo-button'
        >
          <FaPaperPlane />
        </Button>
      </div>
    </Page>
  );
};

export default TodoScreen;
