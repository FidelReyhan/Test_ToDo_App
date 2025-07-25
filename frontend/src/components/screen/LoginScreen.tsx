import { useState, type FC } from "react";
import { NavLink, useNavigate } from "react-router";
import { useUserStore } from "../../store/user";
import { setCookie } from "../../utils/cookie";
import { Button } from "../atom/Button";
import { Card } from "../atom/Card";
import { Input } from "../atom/Input";
import { Page } from "../atom/Page";
import { Text } from "../atom/Text";

type Props = {
  isRegister?: boolean;
};

const Login: FC<Props> = ({ isRegister }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const { findUser } = useUserStore();

  function clearForm() {
    setUsername("");
    setPassword("");
  }

  function handleRegister(event: React.FormEvent) {
    event.preventDefault();
    if (!username || !password) {
      alert("Username and password cannot be empty");
      return;
    }
    const user = findUser(username, password);
    if (user) {
      alert("User already exists");
      return;
    }
    useUserStore.getState().addUser({ id: 0, username, password });
    setCookie("username", username);
    clearForm();
    navigate("/");
  }

  function handleLogin(event: React.FormEvent) {
    event.preventDefault();
    if (isRegister) {
      return handleRegister(event);
    }
    if (!username || !password) {
      alert("Username and password cannot be empty");
      return;
    }
    const user = findUser(username, password);
    if (user) {
      setCookie("username", username);
      return navigate("/");
    } else {
      alert("Invalid username or password");
    }
    clearForm();
  }

  return (
    <Page className='items-center justify-center'>
      <Card className='flex glass bg-white/40 min-w-sm'>
        <div className='flex-1'>
          <h1 className='text-2xl font-bold mb-4'>
            {isRegister ? "Register" : "Login"}
          </h1>
          <form className='flex flex-col gap-4'>
            <Input
              type='text'
              placeholder='Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  handleLogin(e);
                }
              }}
            />
            <Input
              id='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  handleLogin(e);
                }
              }}
            />
            {isRegister && (
              <Input
                id='confirm-password'
                type='password'
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    handleLogin(e);
                  }
                }}
              />
            )}
            <Button
              type='submit'
              disabled={!username || !password}
              className=''
              onClick={handleLogin}
            >
              {isRegister ? "Register" : "Login"}
            </Button>
            <Text>
              {!isRegister ? (
                <>
                  Don't have an account?{" "}
                  <NavLink to='/register'>Register</NavLink>
                </>
              ) : (
                <>
                  Already have an account? <NavLink to='/login'>Login</NavLink>
                </>
              )}
            </Text>
          </form>
        </div>
      </Card>
    </Page>
  );
};

export default Login;
