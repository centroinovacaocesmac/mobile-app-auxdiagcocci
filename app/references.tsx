import "@/global.css";
import { IReference, ReferencesService } from "@/services/referencesService";
import { Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import { RobotoSerif_400Regular, RobotoSerif_700Bold } from '@expo-google-fonts/roboto-serif';
import { router } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Image, Linking, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function References() {
    const [fontsLoaded] = useFonts({
        Roboto_400Regular,
        Roboto_700Bold,
        RobotoSerif_400Regular, 
        RobotoSerif_700Bold,
        Inter_400Regular, 
        Inter_700Bold
    });

    const [searchField, setSearchField] = useState<string>('');
    const [references, setReferences] = useState<IReference[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEimerias = async () => {
            try {
                const query = await ReferencesService.getReferences();
          
                if (query?.status === "OK" && Array.isArray(query.result)) {
                  setReferences(query.result);
                } else {
                  console.warn("Falha ao carregar referências: resposta inesperada", query);
                }
            } catch (error) {
                console.error("Erro ao buscar referências:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEimerias();
    }, []);

    const handlePress = (url:string | undefined) => {
        if (url !== undefined) {
            Linking.openURL(url);
        }
    };

    const filteredReferences = useMemo(() => {
        return references
          .filter(item => item.autor.toLowerCase().includes(searchField.toLowerCase()))
          .sort((a, b) => a.autor.localeCompare(b.autor));
      }, [references, searchField]);

    if (!fontsLoaded || loading) {
        return(
            <>
            <View className="h-[100%]">
            <View className='z-10'>
                <View className='bg-[#235DFF] flex justify-center items-center pt-5'>

                    <View className="flex-row mb-6 w-[100%] justify-between pt-4 px-6 items-center">
                        <TouchableOpacity onPress={() => router.back()}>
                            <Image source={require('@/assets/icons/ArrowBackWhite.png')} style={{width: 30, height: 30}} resizeMode="contain"/>
                        </TouchableOpacity>
                        <View className='w-[60%] bg-white h-[1px] ml-2'></View>
                        <Text className='text-end text-white ml-3 font-robotoBold text-[24px]'>Glossário</Text>
                    </View>

                    <View className='w-[90%] rounded-[14px] bg-white flex-row'
                        style={{shadowColor: '#00000',
                            shadowOffset: { width: 0, height: 10 },
                            shadowOpacity: 0.5,
                            shadowRadius: 14,
                            elevation: 5,
                        }}>

                        <View className='flex justify-center items-center pl-4'>
                            <Image source={require('@/assets/icons/Filter.png')} style={{width: 24, height: 24}} resizeMode="contain"/>
                        </View>

                        <TextInput className=' w-[80%]' 
                            value={searchField}
                            onChangeText={setSearchField}/>

                        <View className='flex justify-center items-center pr-4'>
                            <Image source={require('@/assets/icons/search icon.png')} style={{width: 24, height: 24}} resizeMode="contain"/>
                        </View>
                    </View>
                </View>
                <Image source={require('@/assets/images/Rectangle blu.png')} style={{width:"100%", height: 50}} resizeMode="stretch"/>
            </View>

            <View className="absolute h-[100%] z-20 w-[100%] bg-gray-400/30 flex justify-center items-center">
                <ActivityIndicator size="large" color="#235DFF" />
            </View>

                <View className='bg-[#F2FBF4] w-[100%] absolute z-10 pb-4 top-[92%] justify-between flex-row'>
                    <TouchableOpacity onPress={() => router.push('/home')}>
                        <View className='flex justify-center items-center pl-10 py-2'>
                            <Image source={require('@/assets/icons/homeIconUnSelected.png')} style={{width: 24, height: 24}} resizeMode="contain"/>
                            <Text className='text-[16px] font-roboto'>Inicio</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => router.push('/glossary')}>
                        <View className='flex justify-center items-center pl-4 py-2'>
                            <Image source={require('@/assets/icons/GlossaryIconLineBlu.png')} style={{width: 24, height: 24}} resizeMode="contain"/>
                            <Text className='text-[16px] font-roboto'>Glossário</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => router.push('/references')}>
                        <View className='flex justify-center items-center py-2 pr-5'>
                            <Image source={require('@/assets/icons/ReferecesIconBar.png')} style={{width: 24, height: 24}} resizeMode="contain"/>
                            <Text className='text-[16px] font-roboto'>Referência</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </View>
            </>
        )
    }
    


    return (
        <>
        <View className="h-[100%]">
        <View className='z-10'>
            <View className='bg-[#235DFF] flex justify-center items-center pt-5'>

                <View className="flex-row mb-6 w-[100%] justify-between pt-4 px-6 items-center">
                    <TouchableOpacity onPress={() => router.back()}>
                        <Image source={require('@/assets/icons/ArrowBackWhite.png')} style={{width: 30, height: 30}} resizeMode="contain"/>
                    </TouchableOpacity>
                    <View className='w-[60%] bg-white h-[1px] ml-2'></View>
                    <Text className='text-end text-white ml-3 font-robotoBold text-[24px]'>Referência</Text>
                </View>

                <View className='w-[90%] rounded-[14px] bg-white flex-row'
                    style={{shadowColor: '#00000',
                        shadowOffset: { width: 0, height: 10 },
                        shadowOpacity: 0.5,
                        shadowRadius: 14,
                        elevation: 5,
                    }}>

                    <View className='flex justify-center items-center pl-4'>
                        <Image source={require('@/assets/icons/Filter.png')} style={{width: 24, height: 24}} resizeMode="contain"/>
                    </View>

                    <TextInput className=' w-[80%]' 
                        value={searchField}
                        onChangeText={setSearchField}/>

                    <View className='flex justify-center items-center pr-4'>
                        <Image source={require('@/assets/icons/search icon.png')} style={{width: 24, height: 24}} resizeMode="contain"/>
                    </View>
                </View>
            </View>
            <Image source={require('@/assets/images/Rectangle blu.png')} style={{width:"100%", height: 50}} resizeMode="stretch"/>
        </View>

        {/* Content */}
        <View className="bg-[#F2F2F7] -z-1 -top-[5%] px-2 flex justify-between h-[80%]">
            
            {references.length > 0 ? 
            <ScrollView className='pt-[18%]'>
                <View className='px-4 mb-[28%]'>
                    
                    {filteredReferences.map((item, index) => (
                        <View key={index} style={{shadowColor: '#00000',
                            shadowOffset: { width: 0, height: 10 },
                            shadowOpacity: 0.5,
                            shadowRadius: 14,
                            elevation: 3,
                        }} 
                        className='flex-row items-center m-1 bg-white rounded-[14px] w-[100%]'>
                            <View className={`w-[5%] h-[100%] rounded-l-[14px] bg-[#235DFF]`}></View>

                                {/* Livro */}
                                {item.tipoReferencia === "livro" && <>
                                    <View className="w-[80%] pl-5 py-4">
                                        <Text className='text-[18px] font-robotoBold'>
                                            {item.title}
                                        </Text>
                                        <Text className='text-[16px] mt-2 font-roboto'>
                                            {item.autor} {item.title}. {item?.edicao && `${item.edicao} ed. `}
                                            {item?.editora && `Editora: ${item.editora}, `}{item?.local && `${item.local}, `}
                                            {item?.mes && `${item.mes}. `}{item?.ano && `${item.ano}. `}{item?.paginas && `${item.paginas} p.`}
                                        </Text>
                                    </View>
                                    <View className="flex justify-center items-center w-[12%]">
                                        <Image source={require('@/assets/icons/Open book.png')} style={{width: 24, height: 24}} resizeMode="contain"/>
                                    </View>
                                </>}

                                {/* artigo */}
                                {item.tipoReferencia === "artigo" && <>
                                    <View className="w-[80%] pl-5 py-4">
                                        <Text className='text-[18px] font-robotoBold'>
                                            {item.title}
                                        </Text>
                                        <Text className='text-[16px] mt-2 font-roboto'>
                                            {item.autor} {item.title}. {item?.titlePeriodic && `${item.titlePeriodic}, `}
                                            {item?.volume && `v. ${item.volume}, `}{item?.numero && `n. ${item.numero}, `}
                                            {item?.paginas && `p. ${item.paginas}, `}
                                            {item?.mes && `${item.mes}. `}{item?.ano && `${item.ano}.`}
                                            {item?.doi && ` DOI ${item.doi}. `}
                                            {item?.url && <>
                                                Disponivel em:{" "}
                                                <Text onPress={() => handlePress(item.url)} 
                                                    className="text-[16px] font-roboto text-blue-600 underline">
                                                    {item.url}
                                                </Text>
                                            </>} 
                                        </Text>
                                    </View>
                                    <View className="flex justify-center items-center w-[12%]">
                                        <Image source={require('@/assets/icons/Open book.png')} style={{width: 24, height: 24}} resizeMode="contain"/>
                                    </View>
                                </>}
                                {/* documento institucional / corporativo */}
                                {item.tipoReferencia === "documento institucional / corporativo" && <>
                                    <View className="w-[80%] pl-5 py-4">
                                        <Text className='text-[18px] font-robotoBold'>
                                            {item.title}
                                        </Text>
                                        <Text className='text-[16px] mt-2 font-roboto'>
                                            {item?.instituicao && `${item.instituicao}. `}{item?.title && `${item.title}. `}
                                            {item?.local && `${item.local}. `}{item?.paginas && `${item.paginas} p. `}
                                            {item?.mes && `${item.mes}. `}{item?.ano && `${item.ano}. `}
                                            {item?.url && <>
                                                Disponivel em:{" "}
                                                <Text onPress={() => handlePress(item.url)} 
                                                    className="text-[16px] font-roboto text-blue-600 underline">
                                                    {item.url}
                                                </Text>
                                            </>}  
                                        </Text>
                                    </View>
                                    <View className="flex justify-center items-center w-[12%]">
                                        <Image source={require('@/assets/icons/Open book.png')} style={{width: 24, height: 24}} resizeMode="contain"/>
                                    </View>
                                </>}
                                {/* capítulo de livro */}
                                {item.tipoReferencia === "capítulo de livro" && <>
                                    <View className="w-[80%] pl-5 py-4">
                                        <Text className='text-[18px] font-robotoBold'>
                                            {item.title}
                                        </Text>
                                        <Text className='text-[16px] mt-2 font-roboto'>
                                            {item.autor && `${item.autor} `}{item?.titleCapitulo && `${item.titleCapitulo}. `}
                                            {item?.organizador && `In: ${item.organizador} `}{item?.title && `${item.title}. `}
                                            {item?.edicao && `${item.edicao} ed. `}{item?.local && `${item.local}: `}
                                            {item?.editora && `${item.editora}, `}{item?.volume && `v. ${item.volume}, `}
                                            {item?.numero && `n. ${item.numero}, `}{item?.paginas && `p. ${item.paginas}, `}
                                            {item?.mes && `${item.mes}. `}{item?.ano && `${item.ano}. `}
                                            {item?.doi && ` DOI ${item.doi}. `}{item?.url && <>
                                                Disponivel em:{" "}
                                                <Text onPress={() => handlePress(item.url)} 
                                                    className="text-[16px] font-roboto text-blue-600 underline">
                                                    {item.url}
                                                </Text>
                                            </>} 
                                        </Text>
                                    </View>
                                    <View className="flex justify-center items-center w-[12%]">
                                        <Image source={require('@/assets/icons/Open book.png')} style={{width: 24, height: 24}} resizeMode="contain"/>
                                    </View>
                                </>}
                        </View>))
                    }
                </View>
            </ScrollView>:
            <View className="w-[100%] h-[100%] flex justify-center items-center">
                <Text className="text-[16px] mb-10 font-roboto'">Nenhuma referência cadastrada</Text>
            </View>
            }
        </View>
        
            <View className='bg-[#F2FBF4] w-[100%] absolute z-10 pb-4 top-[92%] justify-between flex-row'>
                <TouchableOpacity onPress={() => router.push('/home')}>
                    <View className='flex justify-center items-center pl-10 py-2'>
                        <Image source={require('@/assets/icons/homeIconUnSelected.png')} style={{width: 24, height: 24}} resizeMode="contain"/>
                        <Text className='text-[16px] font-roboto'>Inicio</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.push('/glossary')}>
                    <View className='flex justify-center items-center pl-4 py-2'>
                        <Image source={require('@/assets/icons/GlossaryIconLine.png')} style={{width: 24, height: 24}} resizeMode="contain"/>
                        <Text className='text-[16px] font-roboto'>Glossário</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.push('/references')}>
                    <View className='flex justify-center items-center py-2 pr-5'>
                        <Image source={require('@/assets/icons/ReferecesIconBarOnSelected.png')} style={{width: 24, height: 24}} resizeMode="contain"/>
                        <Text className='text-[16px] font-roboto'>Referência</Text>
                    </View>
                </TouchableOpacity>
            </View>

        </View>
        </>
    )
}