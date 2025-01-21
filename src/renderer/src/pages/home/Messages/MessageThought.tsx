import { Message } from '@renderer/types'
import { Collapse } from 'antd'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import ReactMarkdown from 'react-markdown'
import BarLoader from 'react-spinners/BarLoader'
import styled from 'styled-components'

interface Props {
  message: Message
}

const MessageThought: FC<Props> = ({ message }) => {
  const isThinking = !message.content
  const { t } = useTranslation()

  if (!message.thought) {
    return null
  }

  return (
    <CollapseContainer
      items={[
        {
          key: 'thought',
          label: (
            <MessageTitleLabel>
              <TinkingText>
                {isThinking
                  ? t('chat.thinking')
                  : t('chat.deeply_thought', { secounds: (message.thought?.time / 1000).toFixed(1) })}
              </TinkingText>
              {isThinking && <BarLoader color="#9254de" />}
            </MessageTitleLabel>
          ),
          children: <ReactMarkdown>{message.thought?.text}</ReactMarkdown>
        }
      ]}
    />
  )
}

const CollapseContainer = styled(Collapse)`
  margin-bottom: 15px;
`

const MessageTitleLabel = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 22px;
  gap: 15px;
`

const TinkingText = styled.span`
  color: var(--color-text-2);
`

export default MessageThought
