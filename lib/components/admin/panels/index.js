import Colors from '../../../containers/admin/colors';
import Fonts from '../../../containers/admin/fonts';
import Media from '../../../containers/admin/media-manager';
import Menu from '../../../containers/admin/menu';
import Menus from '../../../containers/admin/menus';
import Page from '../../../containers/admin/page';
import PageBuild from '../../../containers/admin/page-build';
import Pages from '../../../containers/admin/pages';
import Schema from '../../../containers/admin/schema';
import SchemaEntry from '../../../containers/admin/schema-entry';
import SchemaList from '../../../containers/admin/schema-list';
import Schemas from '../../../containers/admin/schemas';
import Settings from '../../../containers/admin/settings';
import UserEdit from '../../../containers/admin/user-edit';
import Users from '../../../containers/admin/users';
import User from '../../../containers/admin/user';
import Strategy from '../../../containers/admin/strategy';
import Strategies from '../../../containers/admin/strategies';
import Activity from '../../../containers/admin/activity';
import Activities from '../../../containers/admin/activities';
import Topic from '../../../containers/admin/topic';
import Topics from '../../../containers/admin/topics';
import LabelsEdit from '../../../containers/admin/label-edit';
import Labels from '../../../containers/admin/labels';

export default {
  settings: Settings,
  pages: Pages,
  page: Page,
  pageBuild: PageBuild,
  fonts: Fonts,
  media: Media,
  menu: Menu,
  menus: Menus,
  colors: Colors,
  schemas: Schemas,
  schema: Schema,
  schemaList: SchemaList,
  schemaEntry: SchemaEntry,
	strategy: Strategy,
  strategies: Strategies,
	Activity: Activity,
	activities: Activities,
	topic: Topic,
	topics: Topics,
  labels: Labels,
  labelEdit: LabelsEdit,
  users: Users,
  user: User,
  userEdit: UserEdit
};
