import React, { useState } from "https://esm.sh/react@18";
import { createRoot } from "https://esm.sh/react-dom@18/client";

function TeamJoinApp() {
  const [teamName, setTeamName] = useState("");
  const [joinedTeam, setJoinedTeam] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedName = teamName.trim();
    if (!trimmedName) {
      return;
    }

    setJoinedTeam(trimmedName);
    setTeamName("");
  };

  return (
    React.createElement("section", { className: "card" },
      React.createElement("h1", null, "Join the Game"),
      React.createElement("p", { className: "subtitle" }, "Enter your team name to get started."),
      React.createElement("form", { onSubmit: handleSubmit, className: "form" },
        React.createElement("label", { htmlFor: "teamName" }, "Team Name"),
        React.createElement("input", {
          id: "teamName",
          name: "teamName",
          type: "text",
          value: teamName,
          onChange: (event) => setTeamName(event.target.value),
          placeholder: "e.g. Thunderbolts",
          required: true
        }),
        React.createElement("button", { type: "submit" }, "Join Game")
      ),
      joinedTeam && React.createElement(
        "p",
        { className: "success", role: "status" },
        `✅ ${joinedTeam} joined the game!`
      )
    )
  );
}

const root = createRoot(document.getElementById("root"));
root.render(React.createElement(TeamJoinApp));
