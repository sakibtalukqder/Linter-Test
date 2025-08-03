"""A simple script to calculate factorial using recursion."""

def factorial(n: int) -> int:
    """
    Calculate the factorial of a given number using recursion.
    """
    if n in (0, 1):
        return 1
    return n * factorial(n - 1)

def sumf(a: int,b: int) -> int:
    """
    Calculate Summation of tow Numbers.
    """
    summation = a +b
    return summation

def main() -> None:
    """Main function to take user input and display the factorial."""
    try:
        number = int(input("Enter a number: "))
    except ValueError:
        print("Invalid input. Please enter an integer.")
        return

    if number < 0:
        print("Factorial is not defined for negative numbers.")
    else:
        print(f"The factorial of {number} is {factorial(number)}")


if __name__ == "__main__":
    main()
