import React from "react";
import "./index.scss";

const RecipeCard = () => {
  return (
    <>
      <div className="recipeCard">
        <div className="recipeCard__userRow">
          <div className="recipeCard__picSpace">
            <img
              src="https://media.licdn.com/dms/image/D4D03AQHRpriPsqXNyw/profile-displayphoto-shrink_800_800/0/1674105280991?e=2147483647&v=beta&t=1HHq56exp6ajnbwS8rIVQBcxz-kie53VfW5WpfZcOW0"
              alt=""
              className="recipeCard__userImg"
            />
          </div>
          <div className="recipeCard__userData">
            <h2>Facundo Riñón</h2>
            <p>6/10/2023</p>
          </div>
        </div>
        <div className="recipeCard__contentRow">
          <div className="recipeCard__description">
            <p>Nombre de la receta</p>
            <small>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos,
              dolorem quas exercitationem laboriosam mollitia iusto praesentium
              deserunt assumenda eum deleniti nihil, dignissimos, repellendus
              eveniet ratione adipisci ullam ea numquam. Delectus sunt ea, omnis
              adipisci, reiciendis iste aliquam repudiandae sapiente, deleniti
              cum soluta necessitatibus officiis aperiam perferendis facere et
              illum vero.
            </small>
          </div>
          <div className="recipeCard__recipePicSpace">
            <img
              src="https://media.licdn.com/dms/image/D4D03AQHRpriPsqXNyw/profile-displayphoto-shrink_800_800/0/1674105280991?e=2147483647&v=beta&t=1HHq56exp6ajnbwS8rIVQBcxz-kie53VfW5WpfZcOW0"
              alt=""
              className="recipeCard__recipeImg"
            />
          </div>
        </div>
        <div className="recipeCard__footerRow">
          <button className="recipeCard__button">Add to cooking book</button>
        </div>
      </div>
    </>
  );
};

export default RecipeCard;
