import React from "react";

function ToyCard({ toy, toys, setToys }) {
  function handleLike() {
    const updatedLikes = toy.likes + 1;

    fetch(`http://localhost:3001/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likes: updatedLikes }),
    })
      .then((res) => res.json())
      .then((updatedToy) => {
        const updatedToys = toys.map((t) =>
          t.id === toy.id ? updatedToy : t
        );
        setToys(updatedToys);
      });
  }

  function handleDelete() {
    fetch(`http://localhost:3001/toys/${toy.id}`, {
      method: "DELETE",
    }).then(() => {
      setToys(toys.filter((t) => t.id !== toy.id));
    });
  }

  return (
    <div className="card" data-testid="toy-card">
      <h2>{toy.name}</h2>

      <img
        src={toy.image}
        alt={toy.name}
        className="toy-avatar"
      />

    
      <p>{toy.likes} Likes </p>

      <button className="like-btn" onClick={handleLike}>
        Like {"<3"}
      </button>

      <button className="del-btn" onClick={handleDelete}>
        Donate to GoodWill
      </button>
    </div>
  );
}

export default ToyCard;
