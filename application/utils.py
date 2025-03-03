def roles_list(roles): # [<Role 1>, <Role 2>,..]
    role_list = []
    for role in roles:
        role_list.append(role.name)
    return role_list # ['admin', 'user']