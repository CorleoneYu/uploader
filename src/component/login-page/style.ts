import styled from 'styled-components';

export const LoginPage = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  background: #eee;

  .login-form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    width: 334px;
    border: 1px solid #aaa;
    border-radius: 8px;
    background: white;
  }
`;
