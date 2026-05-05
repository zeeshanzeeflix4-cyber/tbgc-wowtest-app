import React, { useMemo, useState } from "https://esm.sh/react@18";
import { createRoot } from "https://esm.sh/react-dom@18/client";

function TeamJoinApp() {
  const [teamName, setTeamName] = useState("");
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState("");

  const normalizedTeams = useMemo(
    () => new Set(teams.map((name) => name.toLowerCase())),
    [teams]
  );

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedName = teamName.trim();
    if (!trimmedName) {
      setError("Please enter a team name.");
      return;
    }

    if (trimmedName.length > 24) {
      setError("Team name must be 24 characters or fewer.");
      return;
    }

    if (normalizedTeams.has(trimmedName.toLowerCase())) {
      setError("That team already joined this game.");
      return;
    }

    setTeams((previousTeams) => [...previousTeams, trimmedName]);
    setTeamName("");
    setError("");
  };

  const clearAllTeams = () => {
    setTeams([]);
    setTeamName("");
    setError("");
  };

  return React.createElement(
    "section",
    { className: "card" },
    React.createElement("h1", null, "Game Lobby"),
    React.createElement(
      "p",
      { className: "subtitle" },
      "Add your team name to join the game."
    ),
    React.createElement(
      "form",
      { onSubmit: handleSubmit, className: "form", noValidate: true },
      React.createElement("label", { htmlFor: "teamName" }, "Team Name"),
      React.createElement("input", {
        id: "teamName",
        name: "teamName",
        type: "text",
        value: teamName,
        onChange: (event) => {
          setTeamName(event.target.value);
          if (error) setError("");
        },
        placeholder: "e.g. Thunderbolts",
        maxLength: 24,
        "aria-describedby": error ? "teamNameError" : undefined,
      }),
      error &&
        React.createElement(
          "p",
          { id: "teamNameError", className: "error", role: "alert" },
          error
        ),
      React.createElement("button", { type: "submit" }, "Join Game")
    ),
    React.createElement(
      "div",
      { className: "teams" },
      React.createElement("h2", null, "Joined Teams"),
      React.createElement(
        "p",
        { className: "count", role: "status" },
        `${teams.length} team${teams.length === 1 ? "" : "s"} joined`
      ),
      teams.length > 0 &&
        React.createElement(
          "button",
          {
            type: "button",
            className: "clearButton",
            onClick: clearAllTeams,
          },
          "Clear All Teams"
        ),
      teams.length === 0
        ? React.createElement(
            "p",
            { className: "empty", role: "status" },
            "No teams yet. Be the first to join!"
          )
        : React.createElement(
            "ul",
            null,
            teams.map((name) =>
              React.createElement("li", { key: name }, `✅ ${name}`)
            )
          )
    )
  );
}

createRoot(document.getElementById("root")).render(React.createElement(TeamJoinApp));
