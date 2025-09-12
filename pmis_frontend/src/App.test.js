import { render, screen } from '@testing-library/react';
import App from './App';

test('renders onboarding title', () => {
  render(<App />);
  const el = screen.getByText(/PM Internship Scheme/i);
  expect(el).toBeInTheDocument();
});
