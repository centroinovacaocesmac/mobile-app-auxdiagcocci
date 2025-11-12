import glossary_icon from '@/assets/icons/GlossaryIconLineBlu.png';
import references_icon from '@/assets/icons/ReferecesIconBarOnSelected.png';
import chicken_icon from '@/assets/images/Galinha.png';
import "@/global.css";
import { Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import { RobotoSerif_400Regular, RobotoSerif_700Bold } from '@expo-google-fonts/roboto-serif';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from "react-native";

export default function Tutorial() {
    const [fontsLoaded] = useFonts({
        Roboto_400Regular,
        Roboto_700Bold,
        RobotoSerif_400Regular, 
        RobotoSerif_700Bold,
        Inter_400Regular, 
        Inter_700Bold
    });

    const [index, setIndex] = useState<number>(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkTutorial = async () => {
          const seen = await AsyncStorage.getItem('tutorialSeen');
          if (seen === 'true') {
            router.replace('/home'); 
          } else {
            setLoading(false); 
          }
        };
        checkTutorial();
      }, []);

    if (!fontsLoaded || loading) {
        return (
            <View className='w-[100%] h-[100%] flex justify-center bg-white items-center'>
                <Image source={require('@/assets/icons/chickenLogo.png')} style={{width:300, height:300}} resizeMode='contain'/>
                <ActivityIndicator size="large" color="#235DFF" />
            </View>
        );
    }

    const buttonPress = async () => {
        if (index == 2) {
            await AsyncStorage.setItem('tutorialSeen', 'true');
            router.push('/home');
        } else {
            setIndex(index + 1);
        }
    }

    return (
        <>
        <View className="w-[210%] -left-[55%] h-[50%] bg-[#235DFF] px-[55%] rounded-b-full">
            <View className="flex justify-center items-end">
                <TouchableOpacity onPressOut={ async () => {
                        await AsyncStorage.setItem('tutorialSeen', 'true');
                        router.push('/home');
                    }}>
                    <View className="bg-[#F2FBF4] px-4 py-2 rounded-[4px] mt-4 mr-4">
                        <Text className="text-[#1b5c9e] font-roboto text-[14px]">Pular</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View className='flex justify-center items-center mt-5'>
                <View className='bg-white rounded-[50%] p-1 flex justify-center items-center'>
                    <Image source={chicken_icon} style={{width: 340, height: 340, borderRadius: 340}} resizeMode="cover" />
                    <View className='absolute top-[75%]'>
                        <Text className='font-roboto text-[20px] tracking-[0.0999em]'>GUIA ILUSTRATIVO DA</Text>
                        <Text className='font-robotoBold text-[24px]'>COCCIDIOSE AVIÁRIA</Text>
                    </View>
                </View>
            </View>
        </View>

        <View className="px-[25px] mt-[42px] flex justify-between h-[45%]">
            <View>
                <Text className="font-robotoSerifBold text-[32px] text-[#235DFF]">
                    {index == 0 && "Identifique lesões com precisão!"}
                    {index == 1 && "Acesso fácil a informações"}
                    {index == 2 && "Como funciona?"}
                </Text>
            </View>

            <View className="px-[7px]">
                {index == 0 && 
                   <Text className="font-robotoSerif text-[18px] text-[#040912]">Este aplicativo foi criado para ajudar você a diagnosticar 
                        lesões causadas por coccídeos de forma rápida e eficiente
                    </Text>
                }
                {index == 1 && 
                    <>
                    <Text className="font-robotoSerif text-[18px] text-[#040912]">
                        Encontre detalhes sobre:
                    </Text>
                    <View className='pl-4'>
                        <Text className='font-robotoSerif text-[18px] text-[#040912]'>
                            ✔ Lesões características
                        </Text>
                    </View>
                    <View className='pl-4'>
                        <Text className='font-robotoSerif text-[18px] text-[#040912]'>
                            ✔ Áreas mais afetadas
                        </Text>
                    </View>
                    <View className='pl-4 mb-2'>
                        <Text className='font-robotoSerif text-[18px] text-[#040912]'>
                            ✔ Possíveis agentes envolvidos
                        </Text>
                    </View>
                    <Text className="font-robotoSerif text-[18px] text-[#040912]">
                        Tudo organizado de maneira intuitiva para otimizar sua análise.
                    </Text>
                    </>
                }
                {index == 2 && 
                    <>
                    <View className='pl-4 flex-row items-center'>
                        <Text className='font-robotoSerif text-[18px] text-[#040912] w-[80%]'>
                            Utilize esse ícone para abrir o dicionário de termos técnicos
                        </Text>
                        <View>
                            <Image source={glossary_icon} style={{width: 40, height: 40}} resizeMode="contain"/>
                        </View>
                    </View>
                    <View className='pl-4 flex-row mt-9 items-center'>
                        <Text className='font-robotoSerif text-[18px] text-[#040912] w-[80%]'>
                            Utilize esse ícone para ver as referências
                        </Text>
                        <View>
                            <Image source={references_icon} style={{width: 40, height: 40}} resizeMode="contain"/>
                        </View>
                    </View>
                    </>
                }
            </View>

            <View className="mb-4">
                <TouchableOpacity onPressOut={buttonPress}>
                    <View 
                        className="bg-[#235DFF] rounded-[14px] h-[44px] w-[100%] flex justify-center items-center">
                        <Text className="text-white text-[20px] font-interBold">
                            {index == 2? "Começar": "Próximo"}
                        </Text>
                    </View>
                </TouchableOpacity>


                <View className='h-[15px] justify-center flex-row mt-2'>
                    {index == 0? 
                        <View className='bg-[#1B5C9E] rounded-[15px] h-[15px] w-[15px] mr-[12px]'></View> : 
                        <View className='bg-[#7E7F7E] rounded-[15px] h-[15px] w-[15px] mr-[12px]'></View>
                    }
                    {index == 1? 
                        <View className='bg-[#1B5C9E] rounded-[15px] h-[15px] w-[15px] mr-[12px]'></View> : 
                        <View className='bg-[#7E7F7E] rounded-[15px] h-[15px] w-[15px] mr-[12px]'></View>
                    }
                    {index == 2? 
                        <View className='bg-[#1B5C9E] rounded-[15px] h-[15px] w-[15px]'></View> : 
                        <View className='bg-[#7E7F7E] rounded-[15px] h-[15px] w-[15px]'></View>
                    }
                </View>
            </View>
        </View>
        </>
    )
}