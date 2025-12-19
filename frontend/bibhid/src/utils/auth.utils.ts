// this is a centralized authentication utility function so that it becomes reusable

/**
 * Handles user logout
 * Makes a POST request to the logout endpoint and clears local storage
 * @returns Promise<boolean> - true if logout was successful, false otherwise
 */
export const handleLogout = async (): Promise<boolean> => {
    try {
        await fetch("http://localhost:5000/auth/logout", {
            method: "POST",
            credentials: "include",
        });

        // Clear localStorage as a defensive measure
        localStorage.clear();

        return true;
    } catch (error) {
        console.error("Logout failed:", error);
        return false;
    }
};
