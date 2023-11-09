import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ScrollView, Image } from 'react-native';
import Sound from 'react-native-sound';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFileAudio, faPlayCircle, faPauseCircle } from '@fortawesome/free-solid-svg-icons';

interface SoundType {
    name: string,
    address: any
}

const Home = () => {
    const intitialSounds = [
        {
            name: 'christmas',
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
    const [sounds, setSounds] = useState<SoundType[]>(intitialSounds);
    const [currentSound, setCurrentSound] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);



    //Set the category of the sound that is to be played
    Sound.setCategory('Playback');

    const soundRef = useRef<Sound | null>(null);

    const playSound = () => {

        soundRef.current = new Sound(sounds[currentSound].address, error => {
            if (error) {
                console.error('Failed to load the sound:', error);
            } else {
                console.log('Sound loaded successfully');
                console.log('duration in seconds: ' + soundRef.current?.getDuration() + ' and number of channels: ' + soundRef.current?.getNumberOfChannels());
                soundRef.current?.play((success) => {
                    if (success) {
                        console.log('successfully finished playing');
                        setCurrentSound(currentSound + 1);
                    }
                    else {
                        console.error('Sound did not play');
                    }
                })
            }
        });
    }
    const handlePlayingSound = () => {

        setIsPlaying(!isPlaying);

    }

    useEffect(() => {

        if (isPlaying && (currentSound < sounds.length || currentSound == 0)) {
            playSound();
        } else if (isPlaying) {
            setCurrentSound(0);
            setIsPlaying(false);
        }
        // Cleanup function
        return () => {
            if (soundRef.current) {
                soundRef.current.release();
            }
        }
    }, [currentSound, isPlaying]);

    console.log('current', currentSound);
    console.log('isPlaying', isPlaying);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sound Player App</Text>
            <Image source={require('../../assets/music.png')} alt='music-icon' />
            <TouchableOpacity
                onPress={() => handlePlayingSound()}
                style={styles.btn}
            >
                {isPlaying && currentSound < sounds.length
                    ? <FontAwesomeIcon icon={faPauseCircle} color='white' size={40} />
                    : <FontAwesomeIcon icon={faPlayCircle} color='white' size={40} />}
            </TouchableOpacity>
            <FlatList
                style={styles.listView}
                data={sounds}
                renderItem={({ item, index }) => (
                    <View style={styles.itemView}>
                        <FontAwesomeIcon icon={faFileAudio} color='white' size={30} />
                        <Text 
                            style={[
                            styles.text,
                            index === currentSound && isPlaying
                                ? styles.textColor
                                : null
                            ]}
                            numberOfLines={2}
                            ellipsizeMode='tail'
                        >
                            {item.name}
                        </Text>
                        <Image style={styles.menu} source={require('../../assets/menu.png')} />
                    </View>
                )}
                keyExtractor={(_, index) => index.toString()}
            />
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
        paddingTop: 30,
    },
    title: {
        fontSize: 35,
        fontWeight: 'normal',
        color: 'white',
        paddingBottom: 0,
        marginBottom: 15,
    },

    itemView: {
        flexDirection: 'row',
        columnGap: 15,
        flexWrap:'nowrap',
        color: 'white',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 20,
    },
    btn: {
        borderWidth: 0,
        backgroundColor: '#282c3d',
        marginTop: 50,
    },

    text: {
        color: 'white',
        fontSize: 18,
    },
    textColor: {
        color: '#FF7F50',
    },
    listView: {
        marginBottom: 30,
    },
    menu: {
        marginLeft: 'auto'
    }

})
