import "@/global.css";
import { eimeriaProps, EimeriaService } from "@/services/eimeriaService";
import { IScientificNames, ScientificNamesService } from "@/services/scientificNamesService";
import { Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { Roboto_400Regular, Roboto_700Bold, Roboto_700Bold_Italic, useFonts } from '@expo-google-fonts/roboto';
import { RobotoSerif_400Regular, RobotoSerif_700Bold } from '@expo-google-fonts/roboto-serif';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function Specie() {
    const [fontsLoaded] = useFonts({
        Roboto_400Regular,
        Roboto_700Bold,
        Roboto_700Bold_Italic,
        RobotoSerif_400Regular, 
        RobotoSerif_700Bold,
        Inter_400Regular, 
        Inter_700Bold
    });

    const { id } = useLocalSearchParams();

    const [eimeria, setEimeria] = useState<eimeriaProps|null>(null);
    const [scientifNames, setScientifNames] = useState<IScientificNames[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
          try {
            if (typeof id === "string") {
              const eimeriaData = await EimeriaService.getEimeria(id);
              setEimeria(eimeriaData);
            }
      
            const sciNameResponse = await ScientificNamesService.getScientificNames();
            if (sciNameResponse.status === "OK") {
              setScientifNames(sciNameResponse.result);
            } else {
              console.log("Erro ao buscar nomes científicos");
            }
          } catch (error) {
            console.log("Erro geral:", error);
          } finally {
            setLoading(false); // <- garante que sempre será executado
          }
        };
      
        fetchData();
      }, [id]);      

    
    
    let gradienteHeight = 123;
    
    if ((eimeria?.score) && (eimeria.score.length > 0)){
        gradienteHeight = eimeria?.score.length * (123 + 11)
    }

    const TextoComItalico = ({ texto }: { texto: string }) => {
        const nomesLower = scientifNames.map(n => n.name.toLowerCase());
        const textoLower = texto.toLowerCase();
        const regex = new RegExp(`\\b(eimeria|e\\.)\\s?(${nomesLower.join('|')})\\b`, 'gi');
        const partes = [];
        let ultimoIndice = 0;
      
        texto.replace(regex, (match, prefixo, nome, offset) => {
            if (offset > ultimoIndice) {
                partes.push(texto.slice(ultimoIndice, offset));
            }
          partes.push(
            <Text key={offset} style={{ fontStyle: 'italic' }}>
              {texto.slice(offset, offset + match.length)} {/* Mantém o original */}
            </Text>
          );
          ultimoIndice = offset + match.length;
          return match;
        });
        
        if (ultimoIndice < texto.length) {
            partes.push(texto.slice(ultimoIndice));
        }
        
        return <Text>{partes}</Text>;
    };
    
    if (!fontsLoaded || loading) {
        return (
            <>
                <View className="h-[100%] relative">
                    <View className='z-10'>

                        <View className='bg-[#FBFBFB] flex justify-center items-center pt-8 pb-4'>
                            <View className='flex-row justify-start items-center w-[100%] pl-6'>
                                <TouchableOpacity onPress={() => router.replace('/home')}>
                                    <Image source={require('@/assets/icons/ArrowBack.png')} style={{width: 24, height: 24}} resizeMode="contain"></Image>
                                </TouchableOpacity>
                                <Text className='text-center w-[60%] font-robotoBoldItalic text-[24px] ml-12'>
                                </Text>
                            </View>
                        </View>

                        <Image source={require('@/assets/images/Rectangle.png')} style={{width:"100%", height: 50}} resizeMode="stretch"/>
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
                                <Image source={require('@/assets/icons/GlossaryIconLine.png')} style={{width: 24, height: 24}} resizeMode="contain"/>
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
        );
    }

    const primeiroScoreComImagem = eimeria?.score?.find(
        (item) => item.img && item.img !== ""
    );

    return (
        <>
        {eimeria ?
            <>
                <View className="h-[100%]">
                    <View className='z-10'>

                        <View className='bg-[#FBFBFB] flex justify-center items-center pt-8 pb-4'>
                            <View className='flex-row justify-start items-center w-[100%] pl-6'>
                                <TouchableOpacity onPress={() => router.replace('/home')}>
                                    <Image source={require('@/assets/icons/ArrowBack.png')} style={{width: 24, height: 24}} resizeMode="contain"></Image>
                                </TouchableOpacity>
                                <Text className='text-center w-[60%] font-robotoBoldItalic text-[24px] ml-12'>
                                    Eimeria <Text className="font-robotoBoldItalic lowercase">{eimeria.name}</Text>
                                </Text>
                            </View>
                        </View>

                        <Image source={require('@/assets/images/Rectangle.png')} style={{width:"100%", height: 50}} resizeMode="stretch"/>
                    </View>

                    {/* Content */}
                    <View className="bg-[#F2F2F7] -z-1 -top-[5%] px-2 flex justify-between h-[89%]">
                        <ScrollView className='pt-[18%]'>
                            {primeiroScoreComImagem ?
                                <View className='w-[100%] px-4 mb-4'>
                                    <Image 
                                        source={{ uri: primeiroScoreComImagem.img }} 
                                        style={{ width: "100%", height: 200, borderRadius: 14 }} 
                                        resizeMode="cover"
                                    />
                                </View>:
                            <></>
                            }

                            {/* Descrição Geral */}
                            <View className='px-4'>
                                <View className='flex-row justify-between items-center mb-4'>
                                    <Text className='font-robotoBold text-[18px]'>Descrição Geral</Text>
                                    <View className='bg-[#2CAFD3] h-[1px] w-[65%]'></View>
                                </View>
                                <View>
                                    <Text className='text-[16px] font-roboto'>
                                        <TextoComItalico texto={eimeria.general_description}/>
                                    </Text>
                                </View>
                            </View>

                            {/* Local de ação */}
                            <View className='px-4 mt-6'>
                                <View className='flex-row justify-between items-center mb-4'>
                                    <Text className='font-robotoBold text-[18px]'>Local de ação</Text>
                                    <View className='bg-[#2CAFD3] h-[1px] w-[65%]'></View>
                                </View>

                                <View className='flex-row w-[100%]'>
                                    <View className='w-[50%]'>
                                        <Image source={{ uri: eimeria.imgLocal }} style={{width: "100%", height: 176}} resizeMode="contain"/>
                                    </View>
                                    <Text className='text-[16px] w-[50%] font-roboto'>
                                        {eimeria.place_of_action && 
                                            <TextoComItalico texto={eimeria.place_of_action}/>
                                        }
                                    </Text>
                                </View>
                            </View>
                            
                            {/* Sinais clínicos */}
                            <View className='px-4 mt-6'>
                                <View className='flex-row justify-between items-center mb-4'>
                                    <Text className='font-robotoBold text-[18px]'>Sinais clínicos</Text>
                                    <View className='bg-[#2CAFD3] h-[1px] w-[65%]'></View>
                                </View>
                                <View>
                                    {eimeria.clinical_signs.map((item, index) => (
                                        <View key={index} className='flex-row items-center m-1'>
                                            <View className='w-[12px] h-[12px] border-[2px] border-[#DD5413]  rounded-full'></View>
                                            <Text className='ml-2 text-[16px] font-roboto'>
                                                <TextoComItalico texto={item}/>
                                            </Text>
                                        </View>))
                                    }
                                </View>
                            </View>
                            
                            {/* Score*/}

                            {(eimeria?.score) && (eimeria.score.length > 0)  && 
                            
                                <View className='px-4 mt-6 mb-[30%]'>
                                    <View className='flex-row justify-between items-center mb-4'>
                                        <Text className='font-robotoBold text-[18px]'>Scores</Text>
                                        <View className='bg-[#2CAFD3] h-[1px] w-[65%]'></View>
                                    </View>
                                    
                                    <Text className='font-roboto text-[16px] mb-4'>Score é uma nota ou grau (geralmente de 0 a 4) atribuída a uma 
                                        lesão observada na necropsia de aves, permitindo avaliar a severidade 
                                        da infecção por Eimeria com base em critérios visuais
                                    </Text>

                                    
                                    <View className="w-[100%] flex-row px-5">
                                        <View className={`w-5 rounded-[10px] items-center`} 
                                            style={{
                                                width: 16,
                                                height: gradienteHeight,
                                                borderRadius: 10,
                                                borderWidth: 1,
                                                borderColor: '#8A8A8A', 
                                                overflow: 'hidden'}}>

                                            <LinearGradient
                                            colors={["#FFF1BB", "#E7810C", "#CB0000"]} // Amarelo para Laranja
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 1 }}
                                            style={{ width: 16, height: gradienteHeight, borderRadius:10}}
                                            />
                                        </View>
                                        {/* Imagens do score */}
                                        <View className="w-[90%]">

                                            {eimeria.score.slice().sort((a, b) => a.level - b.level).map((score, index) => 
                                                <View key={index} className="flex-row w-[100%] mb-[15px]">
                                                    <View className="w-[10%] mr-3 justify-center items-center">
                                                        <Text className="text-[20px] font-roboto font-bold">{score.level}</Text>
                                                    </View>

                                                    {score.img !== "" ?
                                                        <View className="w-[80%] mr-4 justify-center items-center">
                                                            <TouchableOpacity onPress={() => router.navigate({pathname:'/score', params: {id: eimeria.id, index: index}})}>
                                                                <Image source={{ uri: score.img}} 
                                                                    style={{
                                                                        width:255, 
                                                                        height:123,
                                                                        borderRadius: 10,
                                                                        borderWidth: 1,
                                                                        borderColor: '#8A8A8A', 
                                                                        overflow: 'hidden'}}/>
                                                            </TouchableOpacity>
                                                        </View>:

                                                        <View className="w-[253px] -ml-[8px] h-[123px] rounded-lg mr-2 justify-center items-center border border-black">
                                                            <TouchableOpacity className="w-[100%] h-[100%] flex justify-center items-center" onPress={() => router.navigate({pathname:'/score', params: {id: eimeria.id, index: index}})}>
                                                                <Text className="text-[16px] text-center px-6 font-roboto font-bold">
                                                                    Não há imagem disponível para esta seção
                                                                </Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                    }

                                                    <View className="w-[10%] justify-center items-end">
                                                        <TouchableOpacity onPress={() => router.navigate({pathname:'/score', params: {id: eimeria.id, index: index}})}>
                                                            <Image source={require('@/assets/icons/eye_Icon.png')} style={{width:25, height:25}}/>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            )}
                                        </View>
                                    </View>
                                </View>
                            }
                        </ScrollView>
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
                                <Image source={require('@/assets/icons/ReferecesIconBar.png')} style={{width: 24, height: 24}} resizeMode="contain"/>
                                <Text className='text-[16px] font-roboto'>Referência</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>    
            </>:

            <>
                <View className="h-[100%] z-20 w-[100%] bg-gray-400/30 flex justify-center items-center">
                    <ActivityIndicator size="large" color="#235DFF" />
                </View>
            </>}
        
        </>
    )
}