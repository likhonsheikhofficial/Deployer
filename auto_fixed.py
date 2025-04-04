The corrected version of the code should handle the ZeroDivisionError exception. Here's an example:

```python
def corrected_function():
    try:
        return 1/0
    except ZeroDivisionError:
        print("Error: Division by zero is not allowed.")

```
This version uses a try-except block to catch the ZeroDivisionError exception and prints an error message instead of raising an exception.