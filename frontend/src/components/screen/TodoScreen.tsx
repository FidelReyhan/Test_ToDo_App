import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { FaPaperPlane, FaPencil, FaTrash } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router";
import { API_BASE_URL } from "../../constants";
import type { HttpResponse } from "../../type";
import { getCookie, removeCookie } from "../../utils/cookie";
import { Button } from "../atom/Button";
import { Card } from "../atom/Card";
import { Page } from "../atom/Page";

type Todo = {
  ID: number;
  text: string;
  done: boolean;
};

const TodoScreen = () => {
  const [username, setUsername] = useState<string>("");
  const [currentlyEditedTodo, setCurrentlyEditedTodo] = useState<Todo | null>(
    null
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const { data, refetch: refetchTodos } = useQuery<HttpResponse<Todo[]>>({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/todo/items`);
      if (!response.ok) {
        throw new Error("Failed to fetch todos");
      }
      return response.json();
    },
    refetchOnWindowFocus: false,
  });
  const todos = data?.data || [];

  const addTodoMutation = useMutation({
    mutationFn: async (text: string) => {
      const response = await fetch(`${API_BASE_URL}/todo/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });
      if (!response.ok) {
        throw new Error("Failed to add todo");
      }
      return response.json();
    },
    onSuccess: () => {
      refetchTodos();
    },
  });

  const removeTodoMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`${API_BASE_URL}/todo/items/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete todo");
      }
      return response.json();
    },
    onSuccess: () => {
      refetchTodos();
    },
  });

  const editTodoMutation = useMutation({
    mutationFn: async (todo: Todo) => {
      const response = await fetch(`${API_BASE_URL}/todo/items/${todo.ID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });
      if (!response.ok) {
        throw new Error("Failed to edit todo");
      }
      return response.json();
    },
    onSuccess: () => {
      refetchTodos();
    },
  });

  const logout = () => {
    removeCookie("username");
    navigate("/login");
  };

  async function addTodo(text: string) {
    if (text.trim() === "") return;
    await addTodoMutation.mutateAsync(text);
  }

  async function removeTodo(id: number) {
    console.log("removeTodo", id);
    await removeTodoMutation.mutateAsync(id);
  }

  const startEditTodo = (id: number) => {
    const todo = todos.find((todo) => todo.ID === id);
    if (todo) {
      setCurrentlyEditedTodo(todo);
      if (inputRef.current) {
        inputRef.current.value = todo.text;
      }
    }
  };

  async function submitEditTodo(id: number, text: string) {
    if (text.trim() === "") return;
    setCurrentlyEditedTodo(null);
    await editTodoMutation.mutateAsync({ ID: id, text, done: false } as Todo);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

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
                data-testid={`edit-todo-${todo.ID}`}
                onClick={() => startEditTodo(todo.ID)}
                size={10}
                id="edit-todo"
                className="edit-todo"
              />
            </div>
            <FaTrash
              data-testid={`delete-todo-${todo.ID}`}
              onClick={() => removeTodo(todo.ID)}
              size={10}
              id="delete-todo"
            />
          </Card>
        ))}
      </div>
      <div className='fixed bottom-4 left-4 right-4 flex gap-4 lg:max-w-xl xl:left-1/2 xl:-translate-x-1/2 xl:right-0'>
        <input
          ref={inputRef}
          className='outline-none border-none w-full min-h-[40px] rounded-lg bg-white/50 px-3'
          spellCheck='false'
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              const value = e.currentTarget.value;
              if (value) {
                if (currentlyEditedTodo) {
                  submitEditTodo(currentlyEditedTodo.ID, value);
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
                  submitEditTodo(currentlyEditedTodo.ID, value);
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
