import { Candidate } from "../../../models/candidate.model";
import { Candidacy } from "../../../models/candidacy.model";
import { Vacancy } from "../../../models/vacancy.model";
import { Return } from "../../../shared/util/return.contract";

export class ApplicationValidator {
  public static doubleCandidacy(candidatos: Candidacy[], id: string) {
    if (candidatos.some((Candidacy) => Candidacy.candidate.id === id)) {
      return true;
    }

    return false;
  }

  public static validateVacancy(vacancy: Vacancy): Return {
    if (vacancy.dtLimit < new Date()) {
      return {
        ok: false,
        code: 400,
        message: "A data limite já foi alcançada",
      };
    }
    if (vacancy.indActive === false) {
      return {
        ok: false,
        code: 400,
        message: "A vaga não está mais ativa.",
      };
    }

    return {
      ok: true,
      code: 200,
      message: "Done",
    };
  }
}
