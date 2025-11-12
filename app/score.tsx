import "@/global.css";
import { eimeriaProps, EimeriaService } from "@/services/eimeriaService";
import { IScientificNames, ScientificNamesService } from "@/services/scientificNamesService";
import { Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import { RobotoSerif_400Regular, RobotoSerif_700Bold } from '@expo-google-fonts/roboto-serif';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, Image, Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import Zoom from 'react-native-zoom-reanimated';

export default function Score() {
    const { width, height } = Dimensions.get('window');
    const [fontsLoaded] = useFonts({
        Roboto_400Regular,
        Roboto_700Bold,
        RobotoSerif_400Regular, 
        RobotoSerif_700Bold,
        Inter_400Regular, 
        Inter_700Bold
    });

    const { id, index } = useLocalSearchParams();
    const [eimeria, setEimeria] = useState<eimeriaProps|null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [scientifNames, setScientifNames] = useState<IScientificNames[]>([]);
    const [loading, setLoading] = useState(true);
    // const [scale, setScale] = useState<number>(2);

    
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
            console.log("Erro ao carregar dados:", error);
          } finally {
            setLoading(false); // <- sempre executa, mesmo se der erro
          }
        };
      
        fetchData();
    }, [id]);
      
    
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
              {texto.slice(offset, offset + match.length)}
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

    return (
        <>
        { eimeria ? 
            <>
            <View className="h-[100%]">
                <View className='z-10'>
                    <View className='bg-[#FBFBFB] flex justify-center items-center pt-8 pb-4'>
                        <View className='flex-row justify-start items-center w-[100%] pl-6'>
                            <TouchableOpacity onPress={() => router.replace({pathname:'/specie', params: {id: id}})}>
                                <Image source={require('@/assets/icons/ArrowBack.png')} style={{width: 24, height: 24}} resizeMode="contain"></Image>
                            </TouchableOpacity>
                            <Text className='text-center w-[60%] font-robotoBold text-[24px] ml-12'>
                                Score {eimeria.score[Number(index)].level}
                            </Text>
                        </View>
                    </View>

                    <Image source={require('@/assets/images/Rectangle.png')} style={{width:"100%", height: 50}} resizeMode="stretch"/>
                </View>

                {/* Content */}
                <View className="bg-[#F2F2F7] -z-1 -top-[5%] px-2 flex justify-between h-[80%]">
                    <ScrollView className='pt-[18%]'>

                        {eimeria.score[Number(index)].img !== "" ?
                            <View className='w-[100%] px-4 mb-6'>
                                <Image src={eimeria.score[Number(index)].img} 
                                    style={{width: "100%", height: 200, borderRadius: 14}} resizeMode="cover"/>
                                <View className='absolute top-[80%] left-[93%]'>
                                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                                        <Image source={require("@/assets/icons/Search-Circle.png")} style={{width: 30, height: 30}} resizeMode="contain"/>
                                    </TouchableOpacity>
                                </View>
                            </View>:
                            <></>
                        }
                        {/* Descrição Geral */}
                        <View className='px-4 mt-4'>
                            <View className='flex-row justify-between items-center mb-4'>
                                <Text className='font-robotoBold text-[18px]'>Detalhes</Text>
                                <View className='bg-[#2CAFD3] h-[1px] w-[65%]'></View>
                            </View>
                            <View>
                                {eimeria.score[Number(index)].description.map((item, index) => (
                                    <View key={index} className='flex-row items-center m-1'>
                                        <View className='w-[12px] h-[12px] border-[2px] border-[#DD5413]  rounded-full'></View>
                                        <Text className='ml-2 text-[16px] font-roboto'>
                                            <TextoComItalico texto={item}/>
                                        </Text>
                                    </View>))
                                }
                            </View>
                        </View>
                    </ScrollView>

                    {/* Modal com imagem zoom + pan */}
                    <Modal
                        visible={modalVisible}
                        animationType="slide"
                        transparent={false}
                        style={{backgroundColor: "#000000", flex: 1}}
                        onRequestClose={() => setModalVisible(false)}
                    >
                        <GestureHandlerRootView>
                            <Zoom style={{ flex: 1, backgroundColor: "#000000" }}>
                                <Image source={{ uri: eimeria?.score[Number(index)].img }} 
                                        style={{ width:width, height:height, resizeMode: 'contain', transform: [{rotate: '90deg'}] }}/>
                            </Zoom>
                            
                            <View className="absolute top-8 left-[85%]">
                                <TouchableOpacity onPress={() => setModalVisible(false)}>
                                    <Image source={require('@/assets/icons/CloseImage.png')} style={{width: 35, height: 35}} resizeMode="contain"/>
                                </TouchableOpacity>
                            </View>
                        </GestureHandlerRootView>
                    </Modal>
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
            </> :
            <>
                <View className="h-[100%] z-20 w-[100%] bg-gray-400/30 flex justify-center items-center">
                    <ActivityIndicator size="large" color="#235DFF" />
                </View>
            </>}
        
        </>
    )
}