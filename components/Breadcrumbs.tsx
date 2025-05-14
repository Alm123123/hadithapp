import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { BreadcrumbItem } from '@/types/api';
import { ChevronRight } from 'lucide-react-native';
import { Link } from 'expo-router';
import { useSettingsStore } from '@/store/settings';

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const { fontFamily, fontSize, isDarkMode } = useSettingsStore();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={[styles.container, isDarkMode && styles.darkContainer]}
      contentContainerStyle={styles.content}
    >
      {items.map((item, index) => (
        <View key={item.id} style={styles.itemContainer}>
          {index > 0 && <ChevronRight size={16} color={isDarkMode ? '#ccc' : '#666'} style={styles.chevron} />}
          <Link href={`/book/${item.id}`} asChild>
            <TouchableOpacity>
              <Text
                style={[
                  styles.text,
                  { fontFamily, fontSize: fontSize - 2 },
                  index === items.length - 1 && styles.activeText,
                  isDarkMode && styles.darkText,
                  index === items.length - 1 && isDarkMode && styles.darkActiveText,
                ]}
              >
                {item.desc}
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  darkContainer: {
    backgroundColor: '#2a2a2a', // Тёмный фон для хлебных крошек в тёмной теме
    borderBottomColor: '#444', // Цвет разделителя в тёмной теме
  },
  content: {
    padding: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chevron: {
    marginHorizontal: 4,
  },
  text: {
    color: '#666', // Цвет текста в светлой теме
  },
  darkText: {
    color: '#ccc', // Цвет текста в тёмной теме
  },
  activeText: {
    color: '#000', // Цвет активного текста в светлой теме
    fontWeight: 'bold',
  },
  darkActiveText: {
    color: '#fff', // Цвет активного текста в тёмной теме
  },
});
