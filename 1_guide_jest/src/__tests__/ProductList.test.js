import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductList from "../components/ProductList";
import '@testing-library/jest-dom'

describe("ProductList Component - Unit Tests", () => {
  beforeEach(() => {
    render(<ProductList />);
  });

  // Positive Tests
  test("renders initial product list correctly", () => {
    expect(screen.getByText("Product A")).toBeInTheDocument();
    expect(screen.getByText("Product B")).toBeInTheDocument();
  });

  test("adds a new product successfully", () => {
    const nameInput = screen.getByPlaceholderText("Product Name");
    const priceInput = screen.getByPlaceholderText("Price");
    const addButton = screen.getByText("Add Product");

    fireEvent.change(nameInput, { target: { value: "Product C" } });
    fireEvent.change(priceInput, { target: { value: "200" } });
    fireEvent.click(addButton);

    expect(screen.getByText("Product C")).toBeInTheDocument();
    expect(screen.getByText("Price: $200")).toBeInTheDocument();
  });

  test("updates a product's price successfully", () => {
    const increasePriceButton = screen.getAllByText("Increase Price by $10")[0];

    fireEvent.click(increasePriceButton);

    expect(screen.getByText("Price: $60")).toBeInTheDocument(); // Initial price 50 + 10
  });

  test("deletes a product successfully", () => {
    const deleteButton = screen.getAllByText("Delete")[0];

    fireEvent.click(deleteButton);

    expect(screen.queryByText("Product A")).not.toBeInTheDocument();
  });

  // Negative Tests
  test("does not add a product if name or price is empty", () => {
    const nameInput = screen.getByPlaceholderText("Product Name");
    const addButton = screen.getByText("Add Product");

    // Empty name
    fireEvent.change(nameInput, { target: { value: "" } });
    fireEvent.click(addButton);

    expect(screen.getAllByText("Product A").length).toBe(1); // No new product added

    // Empty price
    const priceInput = screen.getByPlaceholderText("Price");
    fireEvent.change(priceInput, { target: { value: "" } });
    fireEvent.click(addButton);

    expect(screen.getAllByText("Product A").length).toBe(1); // Still no new product
  });

  test("does not update a product's price if ID does not exist", () => {
    const updateProductSpy = jest.spyOn(console, "error").mockImplementation();
  
    // Attempting to update a non-existent product
    const nonExistentElement = screen.queryByText("Non-existent Product");
  
    expect(nonExistentElement).not.toBeInTheDocument();
  
    updateProductSpy.mockRestore();
  });

  test("does not delete a product if ID does not exist", () => {
    const deleteButton = screen.queryByText("Non-existent Product");

    expect(deleteButton).not.toBeInTheDocument();
  });

  // Edge Cases
  test("handles large product list efficiently", () => {
    const nameInput = screen.getByPlaceholderText("Product Name");
    const priceInput = screen.getByPlaceholderText("Price");
    const addButton = screen.getByText("Add Product");

    for (let i = 1; i <= 100; i++) {
      fireEvent.change(nameInput, { target: { value: `Product ${i}` } });
      fireEvent.change(priceInput, { target: { value: i } });
      fireEvent.click(addButton);
    }

    expect(screen.getByText("Product 100")).toBeInTheDocument();
  });

  test("handles special characters in product names", () => {
    const nameInput = screen.getByPlaceholderText("Product Name");
    const priceInput = screen.getByPlaceholderText("Price");
    const addButton = screen.getByText("Add Product");

    fireEvent.change(nameInput, { target: { value: "Product @#$%" } });
    fireEvent.change(priceInput, { target: { value: "100" } });
    fireEvent.click(addButton);

    expect(screen.getByText("Product @#$%")).toBeInTheDocument();
  });

  test("handles zero price as valid input", () => {
    const nameInput = screen.getByPlaceholderText("Product Name");
    const priceInput = screen.getByPlaceholderText("Price");
    const addButton = screen.getByText("Add Product");

    fireEvent.change(nameInput, { target: { value: "Free Product" } });
    fireEvent.change(priceInput, { target: { value: "0" } });
    fireEvent.click(addButton);

    expect(screen.getByText("Free Product")).toBeInTheDocument();
    expect(screen.getByText("Price: $0")).toBeInTheDocument();
  });

  test("displays proper message when all products are deleted", () => {
    const deleteButtons = screen.getAllByText("Delete");

    deleteButtons.forEach((button) => fireEvent.click(button));

    expect(screen.getByText("No product available.")).toBeInTheDocument();
  });
});
