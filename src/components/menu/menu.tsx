import './menu.scss';

export const Menu = () => {

    let lunchprice = "90 kr";
    let dinnerprice = "110 kr";
    let wineprice = "50 kr";
    let beerprice = "45 kr";

    return (
        <section className="menu-container">
            <h1 className="menu-container__title">Meny</h1>
            <article className="menu-container__article">
                <h3 className="menu-container__article__title">Lunch</h3>
                <h5 className="menu-container__article__name">Vårrullar</h5><span className="menu-container__article__is">Vårrullar gjorda på mungbönor, mango, morot, zucchini, tofu och sötpotatisnudlar serveras med en fräsch kålslå.</span>
                <span className="menu-container__article__price">{lunchprice}</span>
                <h5 className="menu-container__article__name">Mammas kottbullar</h5><span className="menu-container__article__is">Klassiska vegobullar gjorda på sojafärs serveras med brunsås och norrlänskt potatismos.</span><span className="menu-container__article__price">{lunchprice}</span>
            </article>
            <article className="menu-container__article">
                <h3 className="menu-container__article__title">Kväll</h3>
                <h5 className="menu-container__article__name">Plankstek</h5>
                <span className="menu-container__article__is">Plankstek gjord på Seitan serveras klassiskt med potatismos, vegansk bearnaise och sallad.</span>
                <span className="menu-container__article__price">{dinnerprice}</span>
                <h5 className="menu-container__article__name">Sojakorv Stroganoff</h5 >
                <span className="menu-container__article__is">En stroganoff byggd på vegetarisk sojakorv med en himmelsk tomatsås, dijonsenap och persilja. Serveras med råris och färsk vårsallad.</span>
                <span className="menu-container__article__price">{dinnerprice}</span>
            </article>
            <article className="menu-container__article">
                <h3 className="menu-container__article__title">Dryckesmeny</h3>
                <h5 className="menu-container__article__name">Fatöl</h5>
                <span className="menu-container__article__is">4,5  50cl</span>
                <span className="menu-container__article__price">{beerprice}</span>
                <h5 className="menu-container__article__name">Rött vin</h5>
                <span className="menu-container__article__is">13%  30cl</span>
                <span className="menu-container__article__price">{wineprice}</span>
                <h5 className="menu-container__article__name">Vitt vin</h5>
                <span className="menu-container__article__is">11%  30cl</span>
                <span className="menu-container__article__price">{wineprice}</span>
            </article>
        </section>
    )
}