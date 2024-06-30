const testCases = [
    {
      name: 'cpp : hello world',
      reqObject: {
        language: 'cpp',
        script:
          '#include<bits/stdc++.h>\n' +
          'using namespace std;\n' +
          'int main(){\n' +
          '    cout << "hello world";\n' +
          'return 0;\n' +
          '}\n',
      },
      expectedResponse: {
        val: 'hello world',
        status: 200,
        error: 0,
      },
    },
    {
      name: 'cpp : print stdin',
      reqObject: {
        language: 'cpp',
        script:
          '#include<bits/stdc++.h>\n\n' +
          'using namespace std;\n' +
          'int main(){\n\n' +
          '    int a;\n' +
          '    while(cin >> a){\n' +
          '        cout << a << endl;\n' +
          '    }\n' +
          '    return 0;\n\n' +
          '}\n',
        stdin: '1 2 3',
      },
      expectedResponse: {
        val: '1\n2\n3\n',
        status: 200,
        error: 0,
      },
    },
    {
      name: 'nodejs : hello world',
      reqObject: {
        language: 'nodejs',
        script: 'console.log(\'hello world\')',
      },
      expectedResponse: {
        val: 'hello world\n',
        status: 200,
        error: 0,
      },
    },
    {
      name: 'nodejs : print stdin',
      reqObject: {
        language: 'nodejs',
        script:
          'process.stdin.setEncoding(\'utf8\'); \n ' +
          'process.stdin.on(\'data\', (input) => { \n ' +
          '  console.log(input); \n ' +
          ' \n ' +
          '}); \n ',
        stdin: '1 2 3',
      },
      expectedResponse: {
        val: '1 2 3\n',
        status: 200,
        error: 0,
      },
    },
    {
      name: 'python : hello world',
      reqObject: {
        language: 'python',
        script: 'print("hello world")',
      },
      expectedResponse: {
        val: 'hello world\n',
        status: 200,
        error: 0,
      },
    },
    {
      name: 'python : print stdin',
      reqObject: {
        language: 'python',
        script:
          'try:\n' +
          '    while(True):\n' +
          '        line = input()\n' +
          '        if not line:\n' +
          '            break\n' +
          '        print(line)\n' +
          'except EOFError:\n' +
          '    pass',
        stdin: '1 2 3',
      },
      expectedResponse: {
        val: '1 2 3\n',
        status: 200,
        error: 0,
      },
    },
    {
      name: 'c : hello world',
      reqObject: {
        language: 'c',
        script:
          '#include<stdio.h>\n\n' +
          'int main(){\n\n' +
          '    printf("hello world");\n' +
          '    return 0;\n' +
          '}\n',
      },
      expectedResponse: {
        val: 'hello world',
        status: 200,
        error: 0,
      },
    },
    {
      name: 'c : print stdin',
      reqObject: {
        language: 'c',
        script:
          '#include <stdio.h>\n' +
          'int main() {\n' +
          '    int number;\n' +
          '    while (scanf("%d", &number) == 1) {\n' +
          '        printf("%d\\n", number);\n' +
          '    } \n' +
          '    return 0;\n' +
          '}',
        stdin: '1 2 3',
      },
      expectedResponse: {
        val: '1\n2\n3\n',
        status: 200,
        error: 0,
      },
    },
    {
      name: 'java : print hello world',
      reqObject: {
        language: 'java',
        script:
          'import java.util.Scanner;\n' +
          'public class HelloWorld {\n' +
          '    public static void main(String[] args) {\n' +
          '        System.out.println("hello world");\n' +
          '    }\n' +
          '}\n',
      },
      expectedResponse: {
        val: 'hello world\n',
        status: 200,
        error: 0,
      },
    },
    {
      name: 'java : print stdin',
      reqObject: {
        language: 'java',
        script:
          'import java.util.Scanner;\n' +
          'public class PrintStdin {\n' +
          '    public static void main(String[] args) {\n' +
          '        Scanner scanner = new Scanner(System.in);\n' +
          '        while (scanner.hasNextInt()) {\n' +
          '            int number = scanner.nextInt();\n' +
          '            System.out.println(number);\n' +
          '        } \n' +
          '        scanner.close();\n' +
          '    }\n' +
          '}\n',
        stdin: '1 2 3',
      },
      expectedResponse: {
        val: '1\n2\n3\n',
        status: 200,
        error: 0,
      },
    },
    {
      name: 'ruby : print hello world',
      reqObject: {
        language: 'ruby',
        script:
          'print "hello world"',
      },
      expectedResponse: {
        val: 'hello world',
        status: 200,
        error: 0,
      },
    },
    {
      name: 'ruby : print stdin',
      reqObject: {
        language: 'ruby',
        script:
          'user_input = gets.chomp\n' +
          'puts user_input',
        stdin: '10\n'
      },
      expectedResponse: {
        val: '10\n',
        status: 200,
        error: 0,
      },
    },
    {
      name: 'TLE test',
      reqObject: {
        language: 'nodejs',
        script: 'for(let i=0 ; ; ){i++}',
      },
      expectedResponse: {
        val: 'Time limit exceeded',
        status: 200,
        error: 1,
      },
    },
    {
      name: 'MLE test',
      reqObject: {
        language: 'python',
        script: 'one_gb_data = bytearray(1000 * 1024 * 1024)',
      },
      expectedResponse: {
        val: 'Memory limit exceeded',
        status: 200,
        error: 1,
      },
    },
    {
      name: 'MLE test 2',
      reqObject: {
        language: 'python',
        script:
          'import time\n' +
          'def consume_memory(target_mb, duration_sec):\n' +
          '    float_size = 8\n' +
          '    floats_per_mb = (1024 * 1024) // float_size\n' +
          '    total_floats = target_mb * floats_per_mb\n' +
          '    iterations = int(duration_sec / 0.1)\n' +
          '    floats_per_iteration = total_floats // iterations\n' +
          '    memory_hog = []\n' +
          '    for _ in range(iterations):\n' +
          '        memory_hog.extend([0.0] * floats_per_iteration)\n' +
          '        time.sleep(0.1)\n' +
          'consume_memory(1000, 1)\n',
      },
      expectedResponse: {
        val: 'Memory limit exceeded',
        status: 200,
        error: 1,
      },
    },
    {
      name: 'MLE test 3',
      reqObject: {
        language: 'python',
        script:
          'a = [100]\n' +
          'for i in a:\n' +
          '    a.append(i)\n',
      },
      expectedResponse: {
        val: 'Memory limit exceeded',
        status: 200,
        error: 1,
      },
    },
    {
      name: 'OPEN AI test promptv1',
      reqObject: {
        language: 'promptv1',
        prompt: 'The question is what is 2 plus 2. The answer given is 4.',
      },
      expectedResponse: {
        val: {},
        status: 200,
        error: 0,
      },
    },
    {
      name: 'OPEN AI test promptv2',
      reqObject: {
        language: 'promptv2',
        prompt: 'The question is what is 2 plus 2. The answer given is 4.',
      },
      expectedResponse: {
        val: {},
        status: 200,
        error: 0,
      },
    },
    {
      name: 'sql : create table and insert',
      reqObject: {
        language: 'sql',
        script:
          'CREATE TABLE test (id INT, name TEXT);\n' +
          'INSERT INTO test (id, name) VALUES (1, \'Alice\');\n' +
          'SELECT * FROM test;',
      },
      expectedResponse: {
        val: '1|Alice\n',
        status: 200,
        error: 0,
      },
    },
    {
      name: 'python : fibonacci series',
      reqObject: {
        language: 'python',
        script:
          'def fibonacci(n):\n' +
          '    if n <= 1:\n' +
          '        return n\n' +
          '    else:\n' +
          '        return fibonacci(n-1) + fibonacci(n-2)\n' +
          '\n' +
          'print(fibonacci(10))',
      },
      expectedResponse: {
        val: '55\n',
        status: 200,
        error: 0,
      },
    },
    {
      name: 'java : factorial using recursion',
      reqObject: {
        language: 'java',
        script:
          'public class Factorial {\n' +
          '    public static int factorial(int n) {\n' +
          '        if (n == 0 || n == 1)\n' +
          '            return 1;\n' +
          '        else\n' +
          '            return n * factorial(n - 1);\n' +
          '    }\n' +
          '    public static void main(String[] args) {\n' +
          '        System.out.println(factorial(5));\n' +
          '    }\n' +
          '}',
      },
      expectedResponse: {
        val: '120\n',
        status: 200,
        error: 0,
      },
    },
    {
      name: 'ruby : check prime number',
      reqObject: {
        language: 'ruby',
        script:
          'def is_prime(n)\n' +
          '    return false if n <= 1\n' +
          '    Math.sqrt(n).to_i.downto(2).each {|i| return false if n % i == 0}\n' +
          '    true\n' +
          'end\n' +
          'puts is_prime(17)',
      },
      expectedResponse: {
        val: 'true\n',
        status: 200,
        error: 0,
      },
    },
    {
      name: 'c : calculate factorial using iteration',
      reqObject: {
        language: 'c',
        script:
          '#include <stdio.h>\n' +
          'int main() {\n' +
          '    int n = 5, factorial = 1;\n' +
          '    for (int i = 1; i <= n; ++i) {\n' +
          '        factorial *= i;\n' +
          '    }\n' +
          '    printf("%d\\n", factorial);\n' +
          '    return 0;\n' +
          '}',
      },
      expectedResponse: {
        val: '120\n',
        status: 200,
        error: 0,
      },
    },
    {
      name: 'nodejs : read file content',
      reqObject: {
        language: 'nodejs',
        script:
          'const fs = require(\'fs\');\n' +
          'fs.readFile(\'sample.txt\', \'utf8\', (err, data) => {\n' +
          '    if (err) {\n' +
          '        console.error(err);\n' +
          '        return;\n' +
          '    }\n' +
          '    console.log(data);\n' +
          '});\n',
      },
      expectedResponse: {
        val: 'Hello, this is a sample text file.\n',
        status: 200,
        error: 0,
      },
    },
    {
      name: 'python : write and read from file',
      reqObject: {
        language: 'python',
        script:
          'with open(\'sample.txt\', \'w\') as f:\n' +
          '    f.write(\'This is a sample text file.\')\n' +
          '\n' +
          'with open(\'sample.txt\', \'r\') as f:\n' +
          '    print(f.read())\n',
      },
      expectedResponse: {
        val: 'This is a sample text file.\n',
        status: 200,
        error: 0,
      },
    },
    {
      name: 'java : read from file',
      reqObject: {
        language: 'java',
        script:
          'import java.io.BufferedReader;\n' +
          'import java.io.FileReader;\n' +
          'import java.io.IOException;\n' +
          '\n' +
          'public class ReadFile {\n' +
          '    public static void main(String[] args) {\n' +
          '        try {\n' +
          '            BufferedReader reader = new BufferedReader(new FileReader("sample.txt"));\n' +
          '            String line;\n' +
          '            while ((line = reader.readLine()) != null) {\n' +
          '                System.out.println(line);\n' +
          '            }\n' +
          '            reader.close();\n' +
          '        } catch (IOException e) {\n' +
          '            e.printStackTrace();\n' +
          '        }\n' +
          '    }\n' +
          '}\n',
      },
      expectedResponse: {
        val: 'This is a sample text file.\n',
        status: 200,
        error: 0,
      },
    },
    {
      name: 'sql : update table',
      reqObject: {
        language: 'sql',
        script:
          'CREATE TABLE users (\n' +
          '    id INT PRIMARY KEY,\n' +
          '    name VARCHAR(50)\n' +
          ');\n' +
          'INSERT INTO users (id, name) VALUES (1, \'Alice\');\n' +
          'UPDATE users SET name = \'Bob\' WHERE id = 1;\n' +
          'SELECT * FROM users;\n',
      },
      expectedResponse: {
        val: '1|Bob\n',
        status: 200,
        error: 0,
      },
    },
    {
      name: 'solidity : interact with contract',
      reqObject: {
        language: 'solidity',
        script:
          'pragma solidity ^0.4.24;\n' +
          'contract Counter {\n' +
          '    uint public count;\n' +
          '    constructor() public {\n' +
          '        count = 0;\n' +
          '    }\n' +
          '    function increment() public {\n' +
          '        count++;\n' +
          '    }\n' +
          '    function getCount() public view returns (uint) {\n' +
          '        return count;\n' +
          '    }\n' +
          '}\n' +
          'contract User {\n' +
          '    Counter counter;\n' +
          '    constructor() public {\n' +
          '        counter = new Counter();\n' +
          '    }\n' +
          '    function getCounterCount() public view returns (uint) {\n' +
          '        return counter.getCount();\n' +
          '    }\n' +
          '}\n',
      },
      expectedResponse: {
        val: '0\n',
        status: 200,
        error: 0,
      },
    },
    {
      name: 'go : read from standard input',
      reqObject: {
        language: 'go',
        script:
          'package main\n\n' +
          'import (\n' +
          '    "bufio"\n' +
          '    "fmt"\n' +
          '    "os"\n' +
          ')\n\n' +
          'func main() {\n' +
          '    scanner := bufio.NewScanner(os.Stdin)\n' +
          '    for scanner.Scan() {\n' +
          '        fmt.Println(scanner.Text())\n' +
          '    }\n' +
          '}',
        stdin: 'Hello from stdin\n',
      },
      expectedResponse: {
        val: 'Hello from stdin\n',
        status: 200,
        error: 0,
      },
    },
  ];
  
  module.exports = { testCases };
  