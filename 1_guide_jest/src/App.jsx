import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import ProductList from './components/ProductList';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🌟 Professional Guide for Jest (Testing Suite)</h1>
        <p>
          Master the art of testing with <strong>Jest</strong>, the powerful JavaScript testing framework. Learn to write
          reliable, efficient, and maintainable tests for your applications with this step-by-step guide.
        </p>
        <nav>
          <ul className="nav-list">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className="app-content">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <section className="intro-section">
                  <h2>🚀 Why Choose Jest?</h2>
                  <ul className="highlight-list">
                    <li>✅ Easy-to-use syntax for writing and managing tests.</li>
                    <li>✅ Powerful mocking capabilities for isolated testing.</li>
                    <li>✅ Snapshot testing for ensuring UI consistency.</li>
                    <li>✅ Seamless integration with React and modern libraries.</li>
                  </ul>
                </section>

                <section className="setup-section">
                  <h2>🛠️ Getting Started</h2>
                  <p>Follow these steps to set up Jest in your project:</p>
                  <div className="code-block">
                    <h4>1. Install Jest:</h4>
                    <pre>
                      <code>npm install --save-dev jest</code>
                    </pre>
                    <h4>2. Install Testing Utilities for React:</h4>
                    <pre>
                      <code>npm install --save-dev @testing-library/react @testing-library/jest-dom</code>
                    </pre>
                  </div>
                </section>

                <section className="example-section">
                  <h2>📋 Example Test Case</h2>
                  <p>Here's a simple test to get you started:</p>
                  <div className="code-block">
                    <pre>
                      <code>
                        {`// sum.js
function sum(a, b) {
  return a + b;
}
export default sum;

// sum.test.js
import sum from './sum';

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});`}
                      </code>
                    </pre>
                  </div>
                  <p>Run your test using the following command:</p>
                  <div className="code-block">
                    <pre>
                      <code>npm test</code>
                    </pre>
                  </div>
                </section>

                <section className="advanced-section">
                  <h2>✨ Advanced Features</h2>
                  <p>Take your testing skills to the next level with these features:</p>
                  <ul className="highlight-list">
                    <li>🔍 Mocking: Test functions or modules in isolation.</li>
                    <li>📸 Snapshot Testing: Ensure UI changes are intentional.</li>
                    <li>⏳ Asynchronous Testing: Handle promises and async functions.</li>
                    <li>🌐 Coverage Reports: Identify untested parts of your code.</li>
                  </ul>
                </section>
              </>
            }
          />
          <Route path="/products" element={<ProductList />} />
        </Routes>
      </main>

      <footer className="app-footer">
        <p>
          💡 Dive deeper into Jest by exploring the{' '}
          <a href="https://jestjs.io" target="_blank" rel="noopener noreferrer">
            official documentation
          </a>. Build confidence in your codebase with robust testing!
        </p>
      </footer>
    </div>
  );
}

export default App;
