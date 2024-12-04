import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./categorie.css";

const Insertcategorie = () => {
  const navigate = useNavigate();
  const [categorie, setCategorie] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:3001/api/categories", categorie)
      .then(() => {
        navigate("/categories");
      })
      .catch(() => {
        alert("Erreur ! Insertion non effectuée");
      });
  };

  return (
    <div className="form-container">
      <form className="categorie-form">
        <h2>Ajouter Catégorie</h2>
        <div className="form-group">
          <label htmlFor="Nom">Nom catégorie</label>
          <input
            type="text"
            id="nomcategorie"
            value={categorie.nomcategorie || ""}
            onChange={(e) =>
              setCategorie({ ...categorie, nomcategorie: e.target.value })
            }
            className="form-input"
            placeholder="Entrez nom catégorie"
          />
        </div>
        <div className="form-group">
          <label htmlFor="Image">Image</label>
          <input
            type="text"
            id="imagecategorie"
            value={categorie.imagecategorie || ""}
            onChange={(e) =>
              setCategorie({ ...categorie, imagecategorie: e.target.value })
            }
            className="form-input"
            placeholder="Entrez URL de l'image"
          />
        </div>
        <button
          type="button"
          className="form-submit-button"
          onClick={handleSubmit}
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
};

export default Insertcategorie;
