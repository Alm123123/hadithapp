import { View, FlatList, StyleSheet, Text } from 'react-native';
import { useFavoritesStore } from '@/store/favorites';
import HadithCard from '@/components/HadithCard';
import { Hadith } from '@/types/api';
import { useSettingsStore } from '@/store/settings';

export default function FavoritesScreen() {
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavoritesStore();
  const { isDarkMode } = useSettingsStore();

  const toggleFavorite = (hadith: Hadith) => {
    if (isFavorite(hadith.id)) {
      removeFavorite(hadith.id);
    } else {
      addFavorite(hadith);
    }
  };

  if (favorites.length === 0) {
    return (
      <View style={[styles.centered, ...(isDarkMode ? [styles.darkContainer] : [])]}>
        <Text style={[styles.emptyText, ...(isDarkMode ? [styles.darkText] : [])]}>Список избранного пуст.</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, ...(isDarkMode ? [styles.darkContainer] : [])]}>
      <FlatList
        data={favorites}
        renderItem={({ item }) => (
          <HadithCard
            hadith={item}
            onFavorite={() => toggleFavorite(item)}
            isFavorite={isFavorite(item.id)}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  list: {
    paddingVertical: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  darkText: {
    color: '#fff',
  },
});
