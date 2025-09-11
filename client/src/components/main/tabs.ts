import DocumentIcon from '@/assets/icons/document.svg'
import EditIcon from '@/assets/icons/edit.svg'
import Edit from '@/components/edit'
import Paychecks from '@/components/paychecks'
import { NavigationDrawerTabType } from '@/components/ui/navigationDrawer'

export const MainTabs: NavigationDrawerTabType[] = [
  {
    name: 'Edit',
    title: 'Добавить',
    Icon: EditIcon,
    Component: Edit
  },
  {
    name: 'Paychecks',
    title: 'Чеки',
    Icon: DocumentIcon,
    Component: Paychecks
  }
]
