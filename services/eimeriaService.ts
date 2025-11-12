import { db } from "@/firebaseConfig";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";


export interface Iscore {
    level: number,
    img: string,
    imgPath: string,
    description: Array<string>
}

export interface eimeriaProps{
    id: string,
    name: string,
    imgLocal: string,
    imgPath: string,
    category: string,
    general_description: string,
    place_of_action: string,
    clinical_signs: Array<string>,
    score: Array<Iscore>
}

export const EimeriaService = {
    async getEimerias(): Promise<{status: string, result: Array<eimeriaProps>}> {
        try {
            const querySnapshot = await getDocs(collection(db, 'eimerias'));
            const lista: eimeriaProps[] = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as eimeriaProps[];
            return {status: "OK", result: lista};
        } catch (error) {
            return {status: "Erro ao buscar eimérias" + error, result: []};
        }
    },

    async getEimeria(id:string):Promise<eimeriaProps> {
        try {
            const docRef = doc(db, 'eimerias', id); // Supondo que o doc tem o UID como ID
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                return {
                    id: docSnap.data().id, 
                    name: docSnap.data().name,
                    category: docSnap.data().name,
                    imgLocal: docSnap.data().imgLocal,
                    imgPath: docSnap.data().imgPath,
                    general_description: docSnap.data().general_description,
                    place_of_action: docSnap.data().place_of_action,
                    clinical_signs: docSnap.data().clinical_signs,
                    score: docSnap.data().score,
                };
            } else {
                throw "Eimeria não encontrada";
            }
        } catch (error) {
            throw error;
        }
    },
}