import { RepeatOneSharp } from "@mui/icons-material";
import User from "./models";

const addUser = async (user: User) => {
    console.log("User's ID: ", user.userId);
    const requestUsers = await fetch("/api/users", {
        method: 'GET',
    });
    const responseUsers = await requestUsers.json();
    console.log(responseUsers);

    var alreadyAdded: boolean = false;
    for (let i = 0; i < responseUsers.length; i++) {
        if (responseUsers[i].email === user.email) {
            alreadyAdded = true;
        }
    }
    console.log("alredyAdded: ", alreadyAdded);

    if (!alreadyAdded) {
        const request = await fetch("/api/users", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: user.userId,
                name: user.name,
                email: user.email
            })
        });
        const response = await request.json();
        console.log(response);
    }
}

export { addUser };

// TODO: add user to database (figure our UUID stuff)