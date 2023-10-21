export function chiffresEnLettres(valeur) {
    const unites = ["", "un ", "deux ", "trois ", "quatre ", "cinq ", "six ", "sept ", "huit ", "neuf "];
    const dizaines = ["", "dix ", "vingt ", "trente ", "quarante ", "cinquante ", "soixante ", "soixante-dix ", "quatre-vingts ", "quatre-vingt-dix "];
    const centaines = ["", "cent ", "deux cents ", "trois cents ", "quatre cents ", "cinq cents ", "six cents ", "sept cents ", "huit cents ", "neuf cents "];
    const milliers = ["", "mille ", "deux mille ", "trois mille ", "quatre mille ", "cinq mille ", "six mille ", "sept mille ", "huit mille ", "neuf mille "];
    const millions = ["", "un million ", "deux millions ", "trois millions ", "quatre millions ", "cinq millions ", "six millions ", "sept millions ", "huit millions", "neuf millions"];
  
    function convertirNombreEnLettres(nombre) {
      if (nombre < 10) {
        return unites[nombre];
      } else if (nombre >= 10 && nombre < 20) {
        return dizaines[1] + unites[nombre - 10];
      } else {
        const unite = nombre % 10;
        const dizaine = Math.floor(nombre / 10) % 10;
        const centaine = Math.floor(nombre / 100) % 10;
        const millier = Math.floor(nombre / 1000) % 10;
        const million = Math.floor(nombre / 1000000) % 10;
        const uniteEnLettres = unites[unite];
        const dizaineEnLettres = dizaines[dizaine];
        const centaineEnLettres = centaines[centaine];
        const millierEnLettres = milliers[millier];
        const millionEnLettres = millions[million];
        let resultat = "";
  
        if (million > 0) {
          resultat += millionEnLettres;
          if ((centaine > 0 || dizaine > 0 || unite > 0) && (millier === 0)) {
            resultat += " ";
          }
        }
  
        if (millier > 0) {
          resultat += millierEnLettres;
          if ((centaine > 0 || dizaine > 0 || unite > 0) && (million === 0)) {
            resultat += " ";
          }
        }
  
        if (centaine > 0) {
          resultat += centaineEnLettres;
          if ((dizaine > 0 || unite > 0) && (million === 0 && millier === 0)) {
            resultat += " ";
          }
        }
  
        if (dizaine === 7 || dizaine === 9) {
          resultat += dizaineEnLettres.slice(0, -1);
        } else {
          resultat += dizaineEnLettres;
        }
  
        if (unite > 0) {
          resultat += "-" + uniteEnLettres;
        }
  
        return resultat;
      }
    }
  
    if (valeur === 0) {
      return "zéro";
    } else if (valeur < 0 || valeur >= 100000000) {
      return "Nombre non pris en charge";
    } else {
      return convertirNombreEnLettres(valeur);
    }
  }
  