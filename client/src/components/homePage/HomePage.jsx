import React from "react";
import { Link } from "react-router-dom";
import PageAbout from "./PageAbout";
import LandingPageText from "./LandingPageText";
import AwesomeSlider from "./AwesomeSlider";
import newCol from "../../localDataBase/images/Kinderkleidung/Upcycling/DSC02239.jpg";
import onSale from "../../localDataBase/images/Kinderkleidung/Stories/DSC03434_cjtkcr.jpg";
import candlesOnSale from "../../localDataBase/images/Stories/DSC07177.JPG";
import weihnachten from "../../localDataBase/images/Kerzen/Weihnachtskerzen/20191204_211029_vvuogc.jpg";

const HomePage = () => {
  return (
    <div className="">
      <AwesomeSlider />
      <LandingPageText />

      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 mx-8 gap-8">
          <div className="parent relative overflow-hidden group h-70">
            <div
              className="child w-full h-full transition-transform
                 duration-4000 ease-in-expo ease-out-expo group-hover:scale-110 bg-cover bg-center
                 after:absolute after:w-full after:h-full after:left-0 after:top-0 after:bg-gradient-to-t after:from-neutral-900"
              style={{
                backgroundImage: `url(${newCol})`,
              }}
            ></div>
            <div className="absolute bottom-0 left-0 p-12 text-white">
              <h2 className="text-2xl sm:text-5xl font-bold">
                Neue Kollektion
              </h2>
              <p className="text-xl sm:text-2xl pb-8">
                Entdecken Sie unsere neuesten Ankünfte
              </p>
              <div>
                <Link
                  className="px-8 py-4 w-44 text-white rounded-xl bg-secondary hover:opacity-80"
                  to="/kidsclothes/new-collection"
                >
                  Produkte anzeigen
                </Link>
              </div>
            </div>
          </div>

          <div className="parent relative overflow-hidden group h-70">
            <div
              className="child w-full h-full transition-transform duration-4000 ease-in-expo ease-out-expo group-hover:scale-110 bg-cover bg-center
                after:absolute after:w-full after:h-full after:left-0 after:top-0 after:bg-gradient-to-t after:from-neutral-900"
              style={{
                backgroundImage: `url(${onSale})`,
              }}
            ></div>
            <div className="absolute bottom-0 right-0 p-12 text-white">
              <h2 className="text-3xl sm:text-5xl font-bold">
                Artikel im Angebot
              </h2>
              <p className="text-xl sm:text-2xl pb-8">
                Schnappen Sie sich jetzt tolle Angebote
              </p>
              <div>
                <Link
                  className="px-8 py-4 w-44 text-white rounded-xl bg-secondary hover:opacity-80"
                  to="/kidsclothes/sale"
                >
                  Produkte anzeigen
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-secondary text-center italic font-bold  sm:text-center py-14 lg:text-3xl tracking-normal  ">
          Qualität, die sich wie im Himmel anfühlt, selbst nach unzähligen
          Wäschen
        </h2>
      </section>
      <section className="mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 mx-8">
          {/* First Column */}
          <div className="parent relative overflow-hidden group h-88">
            <div
              className="child w-full h-full transition-transform duration-4000 ease-in-expo ease-out-expo group-hover:scale-110 bg-cover bg-center
                after:absolute after:w-full after:h-full after:left-0 after:top-0 after:bg-gradient-to-t after:from-neutral-900"
              style={{
                backgroundImage: `url(${candlesOnSale})`,
              }}
            ></div>
            <div className="absolute bottom-0 left-0 p-12 text-white">
              {/* Content for the first row */}
              <h2 className="text-2xl sm:text-5xl font-bold">
                Neue Kollektion
              </h2>
              <p className="text-xl sm:text-2xl pb-8">
                Entdecken Sie unsere neuesten Ankünfte
              </p>
              <div>
                <Link
                  className="px-8 py-4 w-44 text-white hover:opacity-80 rounded-xl bg-secondary"
                  to="/candles/new-collection"
                >
                  Produkte anzeigen
                </Link>
              </div>
            </div>
          </div>

          {/* Second Column */}
          <div className="parent relative overflow-hidden group h-88">
            <div className="lg:p-28 lg:m-6 md:p-8 p-2 m-2">
              <h2 className="text-2xl text-secondary text-bold">REIN NATÜRLICH</h2>
              {/* Content for the third row */}
              <p className="mt-8 leading-6">
                Bei La-Nola glauben wir an unerschütterliche Qualität und ein
                unnachgiebiges Engagement für die Umwelt. Genau wie bei unseren
                Kerzen gibt es keine Kompromisse, wenn es um Nachhaltigkeit
                geht.
              </p>

              <p className="mt-8 leading-6">
                Unsere Kerzen werden aus den reinsten, natürlichen Zutaten
                hergestellt und sorgen für ein sauberes und umweltfreundliches
                Abbrennen. Wir sind stolz darauf, umweltfreundliche Wachse wie
                Soja und Bienenwachs zu verwenden, die nicht nur ein länger
                anhaltendes, aromatisches Erlebnis bieten, sondern auch unseren
                CO2-Fußabdruck reduzieren.
              </p>
              <p className="mt-8 leading-6">
                Wir setzen uns dafür ein, den Planeten für zukünftige
                Generationen zu erhalten. Deshalb arbeiten wir mit nachhaltigen
                und ethischen Lieferanten zusammen, um unsere Materialien zu
                beziehen. 
              </p>
            </div>
          </div>

          {/* Third Column */}
          <div className="parent relative overflow-hidden group md:h-88">
            <div className="lg:p-28 lg:m-6 md:p-8 p-2 m-2 text-right leading-4">
              <h2 className="text-3xl text-secondary text-bold">Sonderangebote für Kerzen</h2>
              {/* Content for the fourth row */}
              <p className="mt-8 leading-6">
                Bei La-Nola freuen wir uns, Ihnen exklusive Rabatte auf unsere
                Premium-Kerzensammlung anzubieten. Verpassen Sie nicht diese
                zeitlich begrenzten Angebote, bei denen Sie die gleiche Qualität
                und umweltfreundliche Handwerkskunst zu noch erschwinglicheren
                Preisen genießen können.
              </p>

              <p className="mt-8 leading-6">
                Unsere rabattierten Kerzen werden immer noch aus den reinsten,
                natürlichen Zutaten und nachhaltigen Materialien hergestellt.
                Sie können sich in den reichen Düften und der warmen Atmosphäre
                verwöhnen, während Sie wissen, dass Sie eine
                umweltverantwortliche Wahl treffen.
              </p>
              <p className="mt-8 leading-6">
                Entdecken Sie außergewöhnliche Angebote für unsere Kerzen und
                beleuchten Sie Ihren Raum mit Eleganz und Umweltbewusstsein.
                Kaufen Sie jetzt ein und erleben Sie Luxus zum kleinen Preis.
              </p>
            </div>
          </div>

          {/* Fourth Column */}
          <div className="parent relative overflow-hidden group h-88">
            <div
              className="child w-full h-full transition-transform duration-4000 ease-in-expo ease-out-expo group-hover:scale-110 bg-cover bg-center
                after:absolute after:w-full after:h-full after:left-0 after:top-0 after:bg-gradient-to-t after:from-neutral-900"
              style={{
                backgroundImage: `url(${weihnachten})`,
              }}
            ></div>
            <div className="absolute bottom-0 right-0 p-12 text-white">
              {/* Content for the fourth row */}
              <h2 className="text-3xl sm:text-5xl font-bold">
                Artikel im Angebot
              </h2>
              <p className="text-xl sm:text-2xl pb-8">
                Schnappen Sie sich jetzt tolle Angebote
              </p>
              <div>
                <Link
                  className="px-8 py-4 w-44 text-white hover:opacity-80 rounded-xl bg-secondary"
                  to="/candles/sale"
                >
                  Produkte anzeigen
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-primary text-center  sm:text-center pt-20 pb-2 lg:text-4xl text-2xl tracking-wide ">
          Bio-Kinderkleidung aus Europa
        </h2>
        <p className="text-primary italic text-center sm:text-center pb-20 lg:text-xl  tracking-widest">
          {" "}
          Himmlisch weiche Kleidung, liebevoll aus 100% Bio-Baumwolle
          hergestellt.
        </p>
      </section>

      <PageAbout />
    </div>
  );
};

export default HomePage;
