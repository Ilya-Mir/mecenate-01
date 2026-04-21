import { View } from 'react-native';

import { FeedStateAxolotlIllustration } from '../../../../ui/illustrations/feed-state-axolotl';
import { FeedStateCard } from '../feed-state-card';
import { styles } from './styles';

interface NoResultsStateProps {
  onGoHome: () => void;
}

export function NoResultsState({ onGoHome }: NoResultsStateProps) {
  return (
    <View style={styles.screen}>
      <FeedStateCard
        buttonLabel="На главную"
        fullHeight
        illustration={
          <FeedStateAxolotlIllustration accessibilityLabel="Ничего не найдено" />
        }
        onPress={onGoHome}
        title="По вашему запросу ничего не найдено"
      />
    </View>
  );
}
