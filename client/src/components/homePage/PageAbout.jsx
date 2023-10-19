import clothes from "../../localDataBase/images/Kinderkleidung/Stories/DSC01429_gdefmt.jpg";

function PageAbout() {
  return (
    <section >
      <div className="grid grid-cols-1 md:grid-cols-2 mx-8 mb-9">
        <div className="parent relative overflow-hidden group h-88">
          <div
            className="child w-full h-full transition-transform duration-4000 ease-in-expo ease-out-expo group-hover:scale-110 bg-cover bg-center
            after:absolute after:w-full after:h-full after:left-0 after:top-0 after:bg-gradient-to-t after:from-neutral-900"
            style={{
              backgroundImage: `url(${clothes})`,
            }}
          ></div>
        </div>
        <div className="parent relative overflow-hidden group h-88">
          <div className="lg:p-28 lg:m-6 md:p-8  p-2 m-2 text-left leading-1 lg:text-xl">
            <p className="mt-8 text-lg leading-1">
            La-Nola ist ein kleiner Hersteller, der nachhaltige Produkte mit Liebe, Kreativität und Freude produziert.
            </p>

            <p className="mt-8 text-lg font leading-1">
            Neben einzeln gefertigten Kerzen finden Sie auch bio Kinderbekleidung und inspirierende Aquarell-Postkarten.
            </p>

            <p className="mt-8 text-lg font leading-1">
            Alle Produkte werden auf Bestellung gefertigt und für Sie mit Liebe zum Detail hergestellt.
            </p>

            <p className="mt-8 text-lg font">Viel Spaß beim Durchstöbern.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PageAbout;
