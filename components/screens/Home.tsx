import React, { useEffect, useRef, useState } from 'react';
import { View, Text,  StyleSheet, FlatList, ScrollView, Image } from 'react-native';
import Playlist from '../component/Playlist';


interface SoundType {
    name: string,
    address: any
}

interface GenreTye {
    name: string,
    path: any,
    list: SoundType[],
}

const Home = () => {
    const initialGenresOfMusic = [
        {
            name: 'jazzmusic',
            path: require('../../assets/jazz.jpg'),
            list: [
                {
                    name: 'christmas1',
                    address: require('../../assets/christmas.mp3'),
                },
                {
                    name: 'fun-background funny song offical song',
                    address: require('../../assets/fun-background.mp3'),
                },
                {
                    name: 'howareyou',
                    address: require('../../assets/howareyou.mp3'),
                },
                {
                    name: 'playful',
                    address: require('../../assets/playful.mp3'),
                },
                {
                    name: 'playing',
                    address: require('../../assets/playing.mp3'),
                },
                {
                    name: 'upbeat ',
                    address: require('../../assets/upbeat.mp3'),
                },
                {
                    name: 'life-of-a-wandering-wizard',
                    address: require('../../assets/life-of-a-wandering-wizard.mp3'),
                },
                {
                    name: 'candy',
                    address: require('../../assets/candy.mp3'),
                },
                {
                    name: 'pepperoni',
                    address: require('../../assets/pepperoni.mp3'),
                },
                {
                    name: 'pop',
                    address: require('../../assets/pop.mp3'),
                },
                {
                    name: 'candy2',
                    address: require('../../assets/candy.mp3'),
                },
                {
                    name: 'upbeat2',
                    address: require('../../assets/upbeat.mp3'),
                },
                {
                    name: 'happy2',
                    address: require('../../assets/happy.mp3'),
                },
                {
                    name: 'pepperoni2',
                    address: require('../../assets/pepperoni.mp3'),
                }
            ]
        },
        {
            name: 'popsmusic',
            path: require('../../assets/pop.jpg'),
            list: [
                {
                    name: 'christmas2',
                    address: require('../../assets/christmas.mp3'),
                },
                {
                    name: 'fun-background funny song offical song',
                    address: require('../../assets/fun-background.mp3'),
                },
                {
                    name: 'howareyou',
                    address: require('../../assets/howareyou.mp3'),
                },
                {
                    name: 'playful',
                    address: require('../../assets/playful.mp3'),
                },
                {
                    name: 'playing',
                    address: require('../../assets/playing.mp3'),
                },
                {
                    name: 'upbeat ',
                    address: require('../../assets/upbeat.mp3'),
                },
                {
                    name: 'life-of-a-wandering-wizard',
                    address: require('../../assets/life-of-a-wandering-wizard.mp3'),
                },
                {
                    name: 'candy',
                    address: require('../../assets/candy.mp3'),
                },
                {
                    name: 'pepperoni',
                    address: require('../../assets/pepperoni.mp3'),
                },
                {
                    name: 'pop',
                    address: require('../../assets/pop.mp3'),
                },
                {
                    name: 'candy2',
                    address: require('../../assets/candy.mp3'),
                },
                {
                    name: 'upbeat2',
                    address: require('../../assets/upbeat.mp3'),
                },
                {
                    name: 'happy2',
                    address: require('../../assets/happy.mp3'),
                },
                {
                    name: 'pepperoni2',
                    address: require('../../assets/pepperoni.mp3'),
                }
            ]
        },
        {
            name: 'rocksmusic',
            path: require('../../assets/rock.jpg'),
            list: [
                {
                    name: 'christmas3',
                    address: require('../../assets/christmas.mp3'),
                },
                {
                    name: 'fun-background funny song offical song',
                    address: require('../../assets/fun-background.mp3'),
                },
                {
                    name: 'howareyou',
                    address: require('../../assets/howareyou.mp3'),
                },
                {
                    name: 'playful',
                    address: require('../../assets/playful.mp3'),
                },
                {
                    name: 'playing',
                    address: require('../../assets/playing.mp3'),
                },
                {
                    name: 'upbeat ',
                    address: require('../../assets/upbeat.mp3'),
                },
                {
                    name: 'life-of-a-wandering-wizard',
                    address: require('../../assets/life-of-a-wandering-wizard.mp3'),
                },
                {
                    name: 'candy',
                    address: require('../../assets/candy.mp3'),
                },
                {
                    name: 'pepperoni',
                    address: require('../../assets/pepperoni.mp3'),
                },
                {
                    name: 'pop',
                    address: require('../../assets/pop.mp3'),
                },
                {
                    name: 'candy2',
                    address: require('../../assets/candy.mp3'),
                },
                {
                    name: 'upbeat2',
                    address: require('../../assets/upbeat.mp3'),
                },
                {
                    name: 'happy2',
                    address: require('../../assets/happy.mp3'),
                },
                {
                    name: 'pepperoni2',
                    address: require('../../assets/pepperoni.mp3'),
                }
            ]
        }
    ]
    const [genres, setGenres] = useState<GenreTye[]>(initialGenresOfMusic)
    

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sound Player App</Text>
            <Playlist genres ={genres} />
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#282c3d',
        paddingTop: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'normal',
        color: 'white',
        paddingBottom: 0,
        marginBottom: 10,
    }
})
