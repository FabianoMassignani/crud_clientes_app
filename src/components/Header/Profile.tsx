import { logout } from '../../actions/Auth.thunks'
import { connect, ConnectedProps } from 'react-redux'

interface Props extends ConnectedProps<typeof connector> { }

const _Profile = (props: Props) => {
    const { isAuthenticated, user } = props

    const authLinks = (
        <div className="header-profile">
            <span style={{ fontSize: '20px' }} >{user?.username} </span>
        </div>
    )

    return <>{isAuthenticated ? authLinks : null}</>
}

const mapStateToProps = (state: AppState) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
})

const mapDispatchToProps = {
    logout,
}

const connector = connect(mapStateToProps, mapDispatchToProps)

const Profile = connector(_Profile)

export { Profile }
