import { createContext, useState } from "react";

const ThemeContext = createContext({
    theme: "light",
    toggleTheme: () => { }
});

export function ThemeContextProvider(props) {
    //state to store the theme
    const [theme, setTheme] = useState("light")


    //function to toggle theme between light and dark mode
    function handleToggleTheme() {
        setTheme(prevTheme => prevTheme === "light" ? "dark" : "light")
    }
    
    //context to be provided to children
    const context = {
        theme,
        toggleTheme: handleToggleTheme
    }

    return <ThemeContext.Provider value={context}>{props.children}</ThemeContext.Provider>
}

export default ThemeContext