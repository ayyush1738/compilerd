import React, { useState, useEffect } from 'react';
import axios from 'axios';
import img from "./assets/Logo-nav.png";
import Editor from '@monaco-editor/react';
import { motion } from 'framer-motion';
import { Moon, Sun, Play, Copy, Trash2 } from 'lucide-react';

const languages = [
  { name: "Node.js", value: "nodejs", displayName: "Node.js" },
  { name: "C", value: "c", displayName: "C" },
  { name: "C++", value: "cpp", displayName: "C++" },
  { name: "Python", value: "python", displayName: "Python" },
  { name: "Java", value: "java", displayName: "Java" },
  { name: "Ruby", value: "ruby", displayName: "Ruby" },
  { name: "SQL", value: "sql", displayName: "SQL" },
  { name: "SQLite3", value: "sqlite3", displayName: "SQLite3" },
  { name: "Solidity", value: "solidity", displayName: "Solidity" },
];

const getDefaultCode = (language) => {
  const examples = {
    nodejs: 'console.log("Hello, World!");',
    c: '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}',
    cpp: '#include <iostream>\n\nint main() {\n    std::cout << "Hello, World!" << std::endl;\n    return 0;\n}',
    python: 'print("Hello, World!")',
    java: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
    ruby: 'puts "Hello, World!"',
    sql: 'SELECT * FROM table;',
    sqlite3: 'SELECT * FROM table;',
    solidity: 'contract HelloWorld {\n    function helloWorld() public pure returns (string memory) {\n        return "Hello, World!";\n    }\n}',
  };

  return examples[language] || '';
};

const CodeExecutionComponent = () => {
  const [input, setInput] = useState(getDefaultCode(languages[0].value));
  const [output, setOutput] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [stdin, setStdin] = useState('');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    setIsDarkMode(savedTheme === 'dark');
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  useEffect(() => {
    setInput(getDefaultCode(selectedLanguage.value));
  }, [selectedLanguage]);

  const handleEditorChange = (value) => {
    setInput(value);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(input);
  };

  const handleClearCode = () => {
    const defaultCode = getDefaultCode(selectedLanguage.value);
    setInput(defaultCode);
  };

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle('dark', newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  const handleStdinChange = (e) => {
    setStdin(e.target.value);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
  
    try {
      const response = await axios.post('http://localhost:3000/api/execute', {
        language: selectedLanguage.value,
        script: input,
      });
  
      setOutput(response.data.output);
    } catch (error) {
      console.error('Error executing code:', error);
      setError('There was an error executing the code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`flex flex-col h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="flex-none p-4 bg-gray-900 text-white flex items-center">
        <img src={img} className="h-10" alt="Logo" />
        <span className="ml-2 text-lg font-semibold">Online Compiler</span>
        <motion.button
          className="ml-auto flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 text-gray-300 hover:bg-gray-700"
          onClick={toggleDarkMode}
          aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
        </motion.button>
      </div>

      <div className="flex-1 flex">
        <div className="flex-1 relative">
          <Editor
            height="100%"
            defaultLanguage={selectedLanguage.value}
            defaultValue={getDefaultCode(selectedLanguage.value)}
            theme={isDarkMode ? 'vs-dark' : 'light'}
            value={input}
            onChange={handleEditorChange}
          />
        </div>

        <div className="flex-1 p-4 bg-gray-700">
          <div className="mb-4">
            <label className="block text-white font-bold mb-2">Select Language:</label>
            <div className="flex flex-wrap gap-2">
              {languages.map((lang) => (
                <motion.button
                  key={lang.value}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 shadow-lg ${
                    selectedLanguage.value === lang.value
                      ? 'bg-gradient-to-r from-orange-500 to-purple-500 text-white'
                      : isDarkMode
                      ? 'bg-gray-800 text-gray-200 hover:bg-gray-700'
                      : 'bg-white text-gray-800 hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedLanguage(lang)}
                >
                  {lang.displayName}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center mb-4">
            <div className="space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCopyCode}
                className={`p-2 rounded-full bg-white ${
                  isDarkMode
                    ? 'dark:bg-gray-800 text-gray-200'
                    : 'text-gray-800 transition-colors duration-200 hover:bg-gray-100'
                } shadow-lg`}
                aria-label="Copy code"
              >
                <Copy size={20} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClearCode}
                className={`p-2 rounded-full bg-white ${
                  isDarkMode
                    ? 'dark:bg-gray-800 text-gray-200'
                    : 'text-gray-800 transition-colors duration-200 hover:bg-gray-100'
                } shadow-lg`}
                aria-label="Clear code"
              >
                <Trash2 size={20} />
              </motion.button>
            </div>
          </div>

          <label className="block text-white font-bold mb-2">Standard Input (stdin):</label>
          <textarea
            className={`w-full h-24 p-3 rounded-xl shadow-inner ${
              isDarkMode
                ? 'bg-gray-800 text-gray-100'
                : 'bg-white text-gray-900'
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            value={stdin}
            onChange={handleStdinChange}
            placeholder="Enter input for your code here..."
          />

          <button
            className={`px-4 py-2 rounded-md text-white mt-4 ${
              isLoading ? 'bg-gray-600 cursor-wait' : 'bg-blue-500 hover:bg-blue-600'
            }`}
            onClick={handleSubmit}
            disabled={isLoading}
          >
            <div className="flex items-center space-x-2">
              <Play size={24} />
              <span>{isLoading ? 'Executing...' : 'Execute Code'}</span>
            </div>
          </button>

          {error && (
            <div className="text-red-500 mt-4">{error}</div>
          )}

          <h3 className="text-xl text-white font-bold mt-4">Output:</h3>
          <div className="bg-gray-900 text-white p-4 rounded-md h-screen overflow-y-auto">
            <pre className="whitespace-pre-wrap">{output}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeExecutionComponent;
