import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Book } from '@/types/api';
import { ChevronRight } from 'lucide-react-native';
import { Link } from 'expo-router';
import { useSettingsStore } from '@/store/settings';

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  const { fontFamily, fontSize } = useSettingsStore();

  return (
    <Link href={`/book/${book.id}`} asChild>
      <TouchableOpacity style={styles.container}>
        <View style={styles.content}>
          <Text style={[styles.title, { fontFamily, fontSize: fontSize + 2 }]}>
            {book.desc}
          </Text>
          <ChevronRight size={24} color="#666" />
        </View>
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  title: {
    flex: 1,
    marginRight: 8,
  },
});