import React from "react";
import Card from "./StoryCard";
import firstImage from "../../assets/img/stories-img1.jpg";
import secondImage from "../../assets/img/stories-img2.jpg";
import thirdImage from "../../assets/img/stories-img3.jpg";
import fourthImage from "../../assets/img/stories-img4.jpg";
import fithImage from "../../assets/img/stories-img5.jpg";
import sixthImage from "../../assets/img/stories-img6.jpg";
import seventhImage from "../../assets/img/stories-img7.jpg";
import eigthImage from "../../localDataBase/images/Stories/DSC05549.jpg";
const Stories = () => {
  return (
    <div className="container mx-auto p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-20 pt-8 text-center text-yellow-600">
        Nachhaltigkeitsgeschichten La-Nola.
      </h1>
      <div className="grid grid-cols-1 2xl:grid-cols-2 gap-4">
        <Card
          image={firstImage}
          text={
            <div>
              <h2 className="text-2xl pb-8 text-yellow-800">
                Kuschelige Perfektion für Kinder: Handgemachte Wollwunder!
              </h2>
              <p>
                Die Entdeckung dieser handgemachten Wollkleidung war eine echte
                Bereicherung für die Garderobe meines kleinen Lieblings. Die
                Handwerkskunst ist makellos und garantiert Langlebigkeit und
                Stil. Die Weichheit der Wolle sorgt für unvergleichlichen
                Komfort und macht jedes Outfit zu einer warmen Umarmung. Von
                verspielten Mützen bis zu bezaubernden Pullovern verleihen diese
                Stücke dem Alltag eine elegante Note. Verpassen Sie nicht die
                Gelegenheit, Ihrem Kind das Geschenk von Wärme und Charme mit
                diesen unglaublichen handgemachten Kreationen zu machen!
              </p>
            </div>
          }
          imageOnLeft={true}
        />

        <Card
          image={secondImage}
          text={
            <div>
              <h2 className="text-2xl pb-8 text-yellow-800">
                Wärme und Stil vereint: Handgemachte Wollfreuden!
              </h2>
              <p>
                Eine Welt des Komforts erwartet Ihr Kind in diesen handgemachten
                Wollkleidungsstücken. Mit Liebe und Sorgfalt gefertigt, zeigen
                sie die Kunst handgemachter Kleidung. Die natürliche Wärme der
                Wolle hält meinen kleinen Entdecker gemütlich, ohne die
                Bewegungsfreiheit einzuschränken. Die Vielfalt der Designs
                stellt sicher, dass die Mode nicht für die Funktion
                beeinträchtigt wird. Die glücklichen Fotos von anderen Eltern
                unterstreichen die Freude, die diese Kleidung mit sich bringt.
                Für Qualität, Stil und Komfort sind diese handgemachten
                Wollstücke ein Muss für jede Kinder-Garderobe.{" "}
              </p>
            </div>
          }
          imageOnLeft={false}
        />
        <Card
          image={thirdImage}
          text={
            <div>
              <h2 className="text-2xl pb-8 text-yellow-800">
                Sommerliche Einfachheit: Handgemachte nachhaltige
                Baumwollfreuden!
              </h2>
              <p>
                Was mein Herz wirklich erwärmt, ist die Gewissheit, dass diese
                Kleidungsstücke nachhaltig sind und den CO2-Fußabdruck unserer
                Familie reduzieren. Es ist ein kleiner Schritt in Richtung einer
                grüneren Zukunft, und es fühlt sich wunderbar an, Teil dieser
                Veränderung zu sein. Wenn ich meine Kinder ihre Sommertage in
                diesen bezaubernden Baumwollkreationen genießen sehe, zaubert es
                mir ein Lächeln ins Gesicht. Setzen Sie ein nachhaltiges
                Mode-Statement und bieten Sie Ihren Kindern das Beste aus beiden
                Welten – Stil und Umweltbewusstsein – mit diesen wunderschönen
                handgemachten Baumwollstücken. Der Sommer sah noch nie so gut
                aus!{" "}
              </p>
            </div>
          }
          imageOnLeft={true}
        />
        <Card
          image={fourthImage}
          text={
            <div>
              <h2 className="text-2xl pb-8 text-yellow-800">
                Handgemachte Wollmagie: Wo Komfort auf Eleganz trifft!
              </h2>
              <p>
                Die Suche nach Kleidung, die alle Kriterien erfüllt, kann eine
                Herausforderung sein, aber diese handgemachten
                Wollkleidungsstücke erledigen dies mühelos. Die Liebe zum Detail
                zeigt sich in jeder Naht und schafft Stücke, die nicht nur
                Kleidung, sondern Kunstwerke sind. Die Weichheit der Wolle ist
                eine Umarmung in Stoffform, die mein Kind kuschelig und
                glücklich hält. Diese Kleidungsstücke sind vielseitig genug für
                den täglichen Gebrauch und gleichzeitig charmant genug für
                besondere Anlässe. Das strahlende Lächeln in den Kundenfotos
                bestätigt die Zufriedenheit, die mit diesen Entscheidungen
                einhergeht. Verwandeln Sie die Garderobe Ihres Kindes in ein
                Refugium aus Komfort und Stil mit diesen magischen handgemachten
                Wollstücken!{" "}
              </p>
            </div>
          }
          imageOnLeft={false}
        />
        <Card
          image={fithImage}
          text={
            <div>
              <h2 className="text-2xl pb-8 text-yellow-800">
                Es ist unwiderstehlich weich und kuschelig und bleibt auch nach
                dem Waschen noch genauso kuschelig.
              </h2>
              <p>
                Wir sind mittlerweile sooo überzeugt von den Orbasics
                Kleidungsstücken. Wahnsinn wie gut und unkompliziert sie sitzen
                und irgendwie passen die Sachen auch länger als sonst. Die
                Schnitte sind super und noch dazu bleibt der Stoff, selbst nach
                mehrfachem Waschen wunderbar weich. Wir sind große Fans!{" "}
              </p>
            </div>
          }
          imageOnLeft={true}
        />
        <Card
          image={sixthImage}
          text={
            <div>
              <h2 className="text-2xl pb-8 text-yellow-800">
                Die besten Hosen der Welt
              </h2>
              <p>
                So ein toller Schnitt, unfassbar tolles Material, unfassbar
                weich und anschmiegsam, auch nach 300 Wäschen, ich habe glaub
                ich schon 8 oder 10 Hosen davon in den unterschiedlichsten
                Größen gekauft in den letzten zwei Jahren. Auch sehr
                strapazierfähig{" "}
              </p>
            </div>
          }
          imageOnLeft={false}
        />
        <Card
          image={seventhImage}
          text={
            <div>
              <h2 className="text-2xl pb-8 text-yellow-800">
                Super weicher Stoff, sehr schön!
              </h2>
              <p>
                Ich werde definitiv immer wieder bei La-Nola bestellen. Die
                Stoff fühlt sich sehr angenehm weich und kuschelig an. Dabei
                sieht das Shirt auch sehr wertig aus. Mein kleiner Sohn trägt
                alle Sachen super gerne und sie stehen ihm ausgezeichnet. Daumen
                hoch{" "}
              </p>
            </div>
          }
          imageOnLeft={true}
        />
        <Card
          image={eigthImage}
          text={
            <div>
              <h2 className="text-2xl pb-8 text-yellow-800">
                Definitiv empfehlenswert!
              </h2>
              <p>
                Großartig!! Top Qualität, prima Passform, ideal für den Alltag
                der Kinder. Endlich ein geniales Label ohne verniedlichte
                Aufdrucke und mit 100% Wohlfühlgarantie – schlicht, einfach,
                praktisch. Ich freue mich auf weitere Lieblingskleidungsstücke
                im Kinderkleiderschrank.{" "}
              </p>
            </div>
          }
          imageOnLeft={false}
        />
      </div>
    </div>
  );
};

export default Stories;
