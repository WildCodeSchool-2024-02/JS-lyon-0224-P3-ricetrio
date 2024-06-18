import styles from "./Videopage.module.css";
import NavBar from "../../components/Navbar/Navbar";

function Videopage() {
  return (
    <div>
      <NavBar />
      <div className={styles.videosection}>
        <section className={styles.video}>
          <iframe
            src="https://www.youtube.com/embed/QqNLoJby5eg?si=Ox2xAhTNCf3cwgZ2"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </section>
        <h3>Je suis le titre de la vidéo</h3>
        <section className={styles.synopsis}>
          <p>
            Les nems, ou rouleaux de printemps vietnamiens, sont des friandises
            croustillantes farcies de viande, légumes et vermicelles, frites et
            servies avec une sauce nuoc cham. Les gyozas, raviolis japonais,
            sont farcis de porc et légumes, puis saisis et cuits à la vapeur,
            accompagnés d'une sauce soja-vinaigre.
          </p>
        </section>
        <section className={styles.description}>
          <p>Date de sortie : 17-06-2024</p>
          <p>Durée : 90 minutes</p>
          <p>Genre : Comédie, Crime</p>
          <p>
            Casting : Maurice Barthélemy, Marina Foïs, Elise Larnicol,
            Pierre-François Martin-Laval, Jean-Paul Rouve, Pascal Vincent, Alain
            Chabat, Jean Rochefort
          </p>
        </section>
      </div>
    </div>
  );
}

export default Videopage;
