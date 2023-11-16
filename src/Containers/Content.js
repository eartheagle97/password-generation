import React, { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaRegCopy, FaCheckCircle } from "react-icons/fa";
import Slider from "../Components/Slider";
import Checkbox from "../Components/Checkbox";
import History from "../Components/History";

// Basecolor = #ffef3a

const Content = () => {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(12);
  const [isCopied, setIsCopied] = useState(false);
  const [passwordHistory, setPasswordHistory] = useState(() => {
    const storedHistory = localStorage.getItem("passwordHistory");
    return storedHistory ? JSON.parse(storedHistory) : [];
  });

  useEffect(() => {
    const storedHistory = localStorage.getItem("passwordHistory");
    if (storedHistory) {
      const loadedHistory = JSON.parse(storedHistory).map((entry) => ({
        ...entry,
        copied: false, // Reset copied state on load
      }));
      setPasswordHistory(loadedHistory);
    }
  }, []);

  useEffect(() => {
    const historyToSave = passwordHistory.map((entry) => ({
      password: entry.password, // Only save the password part
    }));
    localStorage.setItem("passwordHistory", JSON.stringify(historyToSave));
  }, [passwordHistory]);

  // When adding a new password to the history
  const addToHistory = (newPassword) => {
    if (newPassword && newPassword !== password) {
      // Check if newPassword is not the current password
      const newEntry = { password: newPassword, copied: false };
      setPasswordHistory((prevHistory) => [...prevHistory, newEntry]);
    }
  };

  const clearHistory = () => {
    setPasswordHistory([]);
  };

  console.log(passwordHistory);
  // State to track which characters to include
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  const checkboxes = [
    {
      label: "ABCD",
      checked: includeUppercase,
      onChange: () => setIncludeUppercase(!includeUppercase),
    },
    {
      label: "abcd",
      checked: includeLowercase,
      onChange: () => setIncludeLowercase(!includeLowercase),
    },
    {
      label: "1234",
      checked: includeNumbers,
      onChange: () => setIncludeNumbers(!includeNumbers),
    },
    {
      label: "($&!",
      checked: includeSymbols,
      onChange: () => setIncludeSymbols(!includeSymbols),
    },
  ];

  const handleGeneratePassword = () => {
    // Characters to use for password generation
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    // Function to accumulate the characters based on user selection
    let charactersToInclude = "";
    if (includeUppercase) charactersToInclude += uppercaseChars;
    if (includeLowercase) charactersToInclude += lowercaseChars;
    if (includeNumbers) charactersToInclude += numberChars;
    if (includeSymbols) charactersToInclude += symbolChars;

    // Random password generation logic
    let generatedPassword = "";
    const charactersLength = charactersToInclude.length;

    if (charactersLength === 0) {
      alert("Please select at least one character type.");
      return;
    }

    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      generatedPassword += charactersToInclude[randomIndex];
    }
    // Set the generated password to state
    if (generatedPassword !== password) {
      // Set the generated password to state
      setPassword(generatedPassword);
      addToHistory(generatedPassword);
    }
  };

  useEffect(() => {
    handleGeneratePassword();
  }, []);

  const handleCopyToClipboard = () => {
    navigator.clipboard
      .writeText(password)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 5000); // Reset the icon after 2 seconds
      })
      .catch((err) => {
        // Handle errors if the copy failed
        console.error("Failed to copy: ", err);
      });
  };

  const copyToClipboard = (password, index) => {
    navigator.clipboard
      .writeText(password)
      .then(() => {
        // Update the copied flag for the specific password
        const newHistory = [...passwordHistory];
        newHistory[index].copied = true;
        setPasswordHistory(newHistory);

        // Reset the flag after a delay
        setTimeout(() => {
          newHistory[index].copied = false;
          setPasswordHistory(newHistory);
        }, 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <main className="container mx-auto p-10 md:p-[100px]">
      <h1 className="title mb-7 w-[400px] md:w-[250px]">PASSWORD GENERATOR</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-stretch">
        <div>
          <div className="mb-7">
            <div className="input-group mb-5 md:w-[400px]">
              <input
                className="w-[400px] h-[40px] p-4"
                type="text"
                value={password}
                disabled
              />
              <button
                onClick={handleCopyToClipboard}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              >
                {isCopied ? (
                  <FaCheckCircle style={{ color: "#ffef3a" }} />
                ) : (
                  <FaRegCopy />
                )}
              </button>
            </div>{" "}
            <button
              className="flex items-center bg-[#ffef3a] rounded-bl-lg hover:bg-[#ecdf52] text-black font-bold py-2 px-4"
              onClick={handleGeneratePassword}
            >
              Generate Password
              <FaArrowRightLong style={{ marginLeft: "20px" }} />
            </button>
          </div>
          <div className="md:w-[400px]">
            <div className="mb-7">
              <Slider
                passwordLength={passwordLength}
                setPasswordLength={setPasswordLength}
                min={6}
                max={20}
              />
            </div>
            <div className="flex items-center justify-between">
              {checkboxes.map((item, index) => (
                <Checkbox
                  key={index}
                  label={item.label}
                  checked={item.checked}
                  onChange={item.onChange}
                />
              ))}
            </div>
          </div>
        </div>
        <div>
          <h2 className="font-bold my-5 text-left">PASSWORD HISTORY</h2>
          <History
            passwordHistory={passwordHistory}
            clearHistory={clearHistory}
            copyToClipboard={copyToClipboard}
            isCopied={isCopied}
          />
        </div>
      </div>
    </main>
  );
};

export default Content;
