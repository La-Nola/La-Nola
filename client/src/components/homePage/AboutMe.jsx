import React from "react";
import StoryCard from "./StoryCard";
import heroImage from "../../localDataBase/images/Stories/DSC05549.jpg";
import noraImage from "../../assets/img/about-img2.jpg";
import missionImage from "../../assets/img/about-img3.jpg";
import qualityImage from "../../assets/img/about-img4.jpg";

const AboutMe = () => {
  return (
    <div>
      {/* Hero section */}
      <div
        className="bg-cover bg-center h-screen flex flex-col justify-center"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        <h1 className="text-5xl italic font-bold text-red-200 text-center hover:scale-95">
          Wir machen bewusste Mode zu einer einfachen Wahl.
        </h1>
      </div>
      <div className="container mx-auto p-4 bg-gray-100">
        <h1 className="text-2xl font-bold mb-2 pt-8 text-center text-yellow-800">
          Alles beginnt mit einem Kind.
        </h1>
        <p className="text-xl  mb-20 pt-2 text-center text-gray-600">
          La-Nola begann als die Reise einer Mutter, bequeme, nachhaltige und
          stilvolle Kleidung ohne schädliche Chemikalien für ihr Kind zu finden,
          und wurde zu einer Mission, einen Unterschied in der
          Bekleidungsindustrie zu machen.
        </p>
        <StoryCard
          image={noraImage}
          text={
            <div>
              <h2 className="text-2xl pb-8 text-yellow-800">
                Hallo, ich bin Nora, die Gründerin von La-Nola.
              </h2>
              <p>
                Tatsächlich musste ich lange suchen, um ein Foto von mir zu
                finden, da ich es viel lieber habe, hinter der Kamera zu sein.
                Das ist eine weitere Leidenschaft von mir. Ich liebe es,
                künstlerisch kreativ zu sein und verfolge verschiedene
                gestalterische Optionen schon seit vielen Jahren. Damit meine
                kreativen Stunden nicht zur Belastung werden, habe ich
                beschlossen, all diese Dinge in Teilzeit zu verfolgen. Aber
                derzeit genieße ich die Elternzeit mit meiner ersten Tochter und
                habe die Möglichkeit, mein kleines Unternehmen voranzubringen,
                was mir viel Freude bereitet, auch wenn es manchmal etwas
                schwierig ist. Denn es ist mir immer noch ein großes Anliegen,
                nur Dinge zu produzieren, die wirklich gebraucht und gewünscht
                werden, um nachhaltig und ökologisch zu arbeiten. Sie können
                mich mit meiner kleinen Familie in der wunderschönen Stadt
                Leipzig finden, und wenn ich nicht in Elternzeit bin, arbeite
                ich als Sozialarbeiterin.
              </p>
            </div>
          }
          imageOnLeft={true}
        />

        <StoryCard
          image={missionImage}
          text={
            <div>
              <h2 className="text-2xl pb-8 text-yellow-800 text-center md:text-start">
                Unsere Mission
              </h2>
              <p>
                Wir haben die Kleidung geschaffen, die wir uns für unsere
                eigenen Kinder und die Kinder unserer Freunde gewünscht haben -
                weiche, hochwertige, nachhaltige und geschlechtsneutrale Basics,
                die super bequem zu tragen sind. Bei La-Nola stehen unsere
                Kunden an erster Stelle. Wir bemühen uns, bedeutsame Beziehungen
                aufzubauen, zu inspirieren und einen positiven Unterschied zu
                machen. Uns liegt das Wohl unserer Kinder und die Gesundheit
                unseres Planeten sehr am Herzen, und wir möchten es einfach
                machen, Gutes zu tun. Wir hoffen, uns gegenseitig zu
                inspirieren, einen positiven Einfluss auf unsere Welt zu haben
                und gemeinsam etwas zu bewirken!
              </p>
            </div>
          }
        />

        <StoryCard
          image={qualityImage}
          text={
            <div>
              <h2 className="text-2xl pb-8 text-yellow-800">
                AUSSERGEWÖHNLICHE QUALITÄT
              </h2>
              <p>
                Bei der Auswahl der Kleidung für unsere Kinder gehen wir keine
                Kompromisse in Bezug auf Qualität ein, insbesondere wenn wir die
                Nachhaltigkeit unserer Entscheidungen berücksichtigen. Unsere
                Kinderkleidung wird mit akribischer Liebe zum Detail und einem
                Fokus auf die Verwendung umweltbewusster Materialien gefertigt.
                Wir verstehen, dass Kinder ihre Kleidung strapazieren können,
                weshalb unsere Kleidungsstücke darauf ausgelegt sind, zu halten,
                sei es, indem sie an jüngere Geschwister weitergegeben werden
                oder von zukünftigen Generationen getragen werden. Indem Sie
                unsere nachhaltig hergestellte Kleidung wählen, bieten Sie Ihrem
                Kind nicht nur weiche, bequeme und sichere Kleidung, sondern
                tragen auch dazu bei, die Umweltauswirkungen der Modeindustrie
                zu reduzieren. Unsere Verpflichtung zu Bio- und ungiftigen
                Materialien, ethischer Produktion und zeitlosem Design
                gewährleistet, dass Ihre Investition in Qualität weit über die
                unmittelbaren Vorteile hinausgeht. Es ist eine bewusste
                Entscheidung für eine bessere Welt, in der Kleidung nicht nur
                eine vorübergehende Modeaussage ist, sondern ein bleibendes
                Zeugnis unserer Hingabe zur Qualität, Nachhaltigkeit und zum
                Wohl unserer Kinder und der Welt, die sie erben werden.
              </p>
            </div>
          }
          imageOnLeft={true}
        />
      </div>
    </div>
  );
};

export default AboutMe;
