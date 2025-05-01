import Flower1 from '../images/Flower1.png';
import Flower2 from '../images/Flower2.png';
import Flower3 from '../images/Flower3.png';
import Flower4 from '../images/Flower4.png';
import Flower5 from '../images/Flower5.png';
import Flower6 from '../images/Flower6.png';
import Flower7 from '../images/Flower7.png';
import Flower8 from '../images/Flower8.png';
import Flower9 from '../images/Flower9.png';
import Flower10 from '../images/Flower10.png';
import Flower11 from '../images/Flower11.png';
import Flower12 from '../images/Flower12.png';

const getFlowerImage = (placeholder) => {
    if (placeholder === "Flower1.png") return Flower1; //
    if (placeholder === "Flower2.png") return Flower2;
    if (placeholder === "Flower3.png") return Flower3;
    if (placeholder === "Flower4.png") return Flower4;
    if (placeholder === "Flower5.png") return Flower5;
    if (placeholder === "Flower6.png") return Flower6;
    if (placeholder === "Flower7.png") return Flower7;
    if (placeholder === "Flower8.png") return Flower8;
    if (placeholder === "Flower9.png") return Flower9;
    if (placeholder === "Flower10.png") return Flower10;
    if (placeholder === "Flower11.png") return Flower11;
    if (placeholder === "Flower12.png") return Flower12;
    return Flower12; //deafult image
  };

  export default getFlowerImage;