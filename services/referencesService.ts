import { db } from "@/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export interface IReference {
    id:string,
    title: string,
    tipoReferencia: string,
    autor: string,
    ano?: string,
    instituicao?: string,
    organizador?: string,
    titleCapitulo?: string,
    titlePeriodic?: string,
    volume?: string,
    numero?: string,
    paginas?: string,
    editora?: string,
    edicao?: string,
    doi?: string,
    mes?: string,
    local?: string,
    tituloSite?: string,
    url?: string,
}

export const ReferencesService = {
    async getReferences() {
        try {
            const querySnapshot = await getDocs(collection(db, 'reference'));
            const lista: IReference[] = querySnapshot.docs.map(doc => ({
                ...doc.data()
            })) as IReference[];
            return {status: "OK", result: lista};
        } catch (error) {
            return {status: "Erro ao buscar as referências" + error, result: []};
        }
    },
}