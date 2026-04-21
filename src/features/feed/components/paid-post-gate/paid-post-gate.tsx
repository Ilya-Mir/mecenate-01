import { Text, View } from 'react-native';

import { tokens } from '../../../../theme/tokens';
import { Button } from '../../../../ui/button/button';
import { DonateIcon } from '../../../../ui/icons';
import { styles } from './styles';

interface PaidPostGateProps {
  onPress?: () => void;
}

export function PaidPostGate({ onPress }: PaidPostGateProps) {
  return (
    <View style={styles.overlay}>
      <View style={styles.message}>
        <View style={styles.topContent}>
          <View style={styles.textIcon}>
            <View style={styles.iconBox}>
              <DonateIcon size={tokens.components.feedCard.paywallIconInnerSize} />
            </View>

            <Text style={styles.copy}>
              Контент скрыт пользователем.{'\n'}
              Доступ откроется после доната
            </Text>
          </View>
        </View>

        <Button label="Отправить донат" onPress={onPress} style={styles.button} />
      </View>
    </View>
  );
}
