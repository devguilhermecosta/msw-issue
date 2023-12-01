import { fireEvent, render, screen } from '@testing-library/react';
import LoginPage from '..';
import { BrowserRouter } from 'react-router-dom';
import { userEvent } from '@testing-library/user-event';
import { AuthProvider } from '../../../contexts/authContext';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

const handlers = [
  http.post(`http://127.0.0.1:8000/api/token/`, () => {
    return HttpResponse.json(null, { status: 401 });
  })
]
 
export const server = setupServer(...handlers)

 
function renderLoginPage() {
  return (
    render(
      <AuthProvider>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </AuthProvider>
    )
  )
}

describe('<loginPage />', () => {
  beforeAll(() => {
    server.listen();

    console.log('listening....');

    server.events.on('request:start', ({ request }) => {
      console.log('MSW intercepted:', request.method, request.url)
    })
  });

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('should render username or password is invalid', async () => {

    renderLoginPage();

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    fireEvent.change(usernameInput, { target: { value: 'test' } });
    fireEvent.change(passwordInput, { target: { value: 'test' } });

    const button = screen.getByText(/sign in/i);

    await userEvent.click(button);

    await screen.findByText(/usuário ou senha inválidos/i);
  })
})
