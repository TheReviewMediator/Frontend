import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; // Import Router for routing
import App from './App';

describe('App', () => {
  it('renders welcome message', () => {
    render(
        <App />
    );
    const welcomeMessage = screen.getByText(/Welcome to Mediator Portal/i);
    expect(welcomeMessage).toBeInTheDocument();
  });
});

describe('App', () => {
  it('renders login link', () => {
    render(
        <App />
    );
    const loginLink = screen.getByText(/Login/i);
    expect(loginLink).toBeInTheDocument();
  });
});

describe('App', () => {
  it('renders signup link', () => {
    render(
        <App />
    );
    const signupLink = screen.getByText(/Signup/i);
    expect(signupLink).toBeInTheDocument();
  });
});
