function fibonacci(n) {
    if (n < 0) return 0
    if (n < 2) return n
    return fibonacci(n - 1) + fibonacci(n - 2)
}
