import { View } from 'react-native';

import { FeedStateAxolotlIllustration } from '../../../../ui/illustrations/feed-state-axolotl';
import { FeedStateCard } from '../feed-state-card';
import { styles } from './styles';

interface ErrorStateProps {
  title: string;
  buttonLabel: string;
  onRetry: () => void;
}

const ERROR_STATE_AUTHOR = {
  name: 'Петр Федько',
  avatarUrl: 'https://s3.regru.cloud/mecenate-test-picture/pic6.jpeg',
};

export function ErrorState({
  title,
  buttonLabel,
  onRetry,
}: ErrorStateProps) {
  return (
    <View style={styles.screen}>
      <FeedStateCard
        authorAvatarUrl={ERROR_STATE_AUTHOR.avatarUrl}
        authorName={ERROR_STATE_AUTHOR.name}
        buttonLabel={buttonLabel}
        illustration={
          <FeedStateAxolotlIllustration accessibilityLabel="Не удалось загрузить данные" />
        }
        onPress={onRetry}
        title={title}
      />
    </View>
  );
}
